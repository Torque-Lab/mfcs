import socket
import os
import json
import matplotlib.pyplot as plt


SOCK_PATH = "/tmp/mfcs.sock"


def recv_exactly(sock: socket.socket, size: int) -> bytes:

	chunks = []
	remaining = size

	while remaining > 0:
		chunk = sock.recv(remaining)

	if not chunk:
		raise ConnectionError("Socket connection closed")

	chunks.append(chunk)
	remaining -= len(chunk)

	return b"".join(chunks)

def handle_messages(message: dict):
	header = message.get("header", {})
	data = message.get("data")

	graph_type = header.get("graphType")

	print(f"Received graph type: {graph_type}")

	match graph_type:
		case "line":
			handle_line_graph(header, data)

		case "scatter":
			handle_scatter_graph(header, data)

		case "bar":
			handle_bar_graph(header, data)

		case "histogram":
			handle_histogram(header, data)

		case "pie":
			handle_pie_graph(header, data)

		case _:
			print(f"Unknown graph type: {graph_type}")

def create_figure(header: dict):

	title = header.get("title", "")
	x_label = header.get("x_label", "X")
	y_label = header.get("y_label", "Y")

	fig, ax = plt.subplots()

	if title:
		ax.set_title(title)

	ax.set_xlabel(x_label)
	ax.set_ylabel(y_label)

	return fig, ax

def handle_line_graph(header: dict, data):
	fig, ax = create_figure(header)
	questionId=header.get("questionId")

	x = data["x"]
	y = data["y"]

	ax.plot(x, y)
	plt.savefig(f"{questionId}+.png", dpi=300,bbox_inches="tight",transparent=True)

def handle_scatter_graph(header: dict, data):
	fig, ax = create_figure(header)
	questionId=header.get("questionId")

	x = data["x"]
	y = data["y"]	
	ax.scatter(x, y)	
	plt.savefig(f"{questionId}+.png", dpi=300,bbox_inches="tight",transparent=True)

def handle_bar_graph(header: dict, data):
	fig, ax = create_figure(header)	
	questionId=header.get("questionId")
	x = data["x"]
	y = data["y"]	
	ax.bar(x, y)	
	plt.savefig(f"{questionId}+.png", dpi=300,bbox_inches="tight",transparent=True)

def handle_histogram(header: dict, data):
	fig, ax = create_figure(header)	
	questionId=header.get("questionId")
	values = data["values"]	
	ax.hist(values)	
	plt.savefig(f"{questionId}+.png", dpi=300,bbox_inches="tight",transparent=True)


def handle_pie_graph(header: dict, data):
	fig, ax = create_figure(header)	
	questionId=header.get("questionId")
	labels = data["labels"]
	values = data["values"]	
	ax.pie(values, labels=labels)
	plt.savefig(f"{questionId}+.png", dpi=300,bbox_inches="tight",transparent=True)


def handle_horizontal_charts(header:dict,data):
	subQuestion =header.get("subQuestion")
	match subQuestion:
		case "horizontal_vdi":
			handle_vtop_50_vdi_horizonatal(header,data)


def handle_vtop_50_di_horizonatal(header:dict, data):
	fig,ax=create_figure(header)
	questionId=header.get("questionId")
	village_name=data["village_name"]
	village_vdi=data["village_vdi"]
	ax.barh(village_name, village_vdi, align='center')
	ax.yaxis.set_inverted(True)  
	plt.savefig(f"{questionId}+.png",dpi=300,bbox_inches="tight",transparent=True )



def start_server():

	if os.path.exists(SOCK_PATH):
		os.unlink(SOCK_PATH)

	server = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)

	server.bind(SOCK_PATH)
	server.listen(1)

	print(f"listening on {SOCK_PATH}")

	soc, _ = server.accept()

	print("nodejs connected")

	try:
		while True:
			length_bytes = recv_exactly(soc, 4)
			length = int.from_bytes(length_bytes,"big")
			payload = recv_exactly(soc,length)
			message = json.loads(payload.decode("utf-8"))
			handle_messages(message)

	except ConnectionError as e:
		print(f"connection closed: {e}")

	except KeyboardInterrupt:
		print("stopping server...")

	finally:
		soc.close()
		server.close()

	if os.path.exists(SOCK_PATH):
		os.unlink(SOCK_PATH)


if __name__ == "__main__":
	start_server()
