import type { Socket } from "node:dgram";
import net from "node:net";

interface MessageHeader {
	Question?: number;
	SubQuestion:string
	x_labal: string;
	y_labal:string
	title: string
	graphType:string

}

interface TransportMessage {
	header: MessageHeader;
	data: unknown;
}

class Transport {
	private static socketEndpoint: net.Socket | null = null;
	private readonly socketPath = "/tmp/mfcs.sock";
	private receiveBuffer = Buffer.alloc(0);
	private pendingWrites: Buffer[] = [];
	private waitingForDrain = false;

	constructor() {
		this.createConnection();
	}
	private createConnection(): void {
		const socket = net.createConnection(this.socketPath);

		socket.on("connect", () => {
			console.log(`connected to ${this.socketPath}`);

			Transport.socketEndpoint = socket;
		});

		socket.on("data", (chunk: Buffer) => {
			console.log("currenttely nodejs will not handle any data from from python")
		});

		socket.on("error", (error: Error) => {
			console.error("socket error:", error);
		});

		socket.on("close", () => {
			console.log("socket connection closed");

			if (Transport.socketEndpoint === socket) {
				Transport.socketEndpoint = null;
			}
		});

		socket.on("end", () => {
			console.log("python closed the connection");
		});
	}

	public writerDataForPython(header: MessageHeader, data: unknown): void {

		const socket = Transport.socketEndpoint;
		if (!socket || socket.destroyed) {
			throw new Error("Python socket is not connected");
		}

		const message: TransportMessage = {
			header: {
			...header,
			},
			data,
		};

		const payload = Buffer.from(
			JSON.stringify(message),
			"utf8"
		);

		
		const length = Buffer.alloc(4);
		length.writeUInt32BE(payload.length, 0);

		this.pendingWrites.push(Buffer.concat([length, payload]));
		this.flushWrites(socket);

	}
	private flushWrites(socket: net.Socket): void {
		if (this.waitingForDrain) {
			return;
		}

		while (this.pendingWrites.length > 0) {
			const buffer = this.pendingWrites.shift()!;

			if (!socket.write(buffer)) {
				this.waitingForDrain = true;
				socket.once("drain", () => {
				this.waitingForDrain = false;
				this.flushWrites(socket);
			});
			return;
			}
		}
	}
	public isConnected(): boolean {
	return ( Transport.socketEndpoint !== null &&
			!Transport.socketEndpoint.destroyed
		);
	}
	public close(): void {
		const socket = Transport.socketEndpoint;

		if (socket && !socket.destroyed) {
			socket.end();
		}

		Transport.socketEndpoint = null;
	}
}

export default Transport;
