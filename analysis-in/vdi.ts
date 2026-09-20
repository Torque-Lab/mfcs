import type { DuckDBConnection } from "@duckdb/node-api";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import Transport from "./sock.js";
import * as math from "mathjs"
import duckdb from "@duckdb/node-api";
import type { VDIData } from "./common_type.js";




function minMaxNorm(vals: number[]): number[] {
	let min = vals[0],max = vals[0];

	for (const v of vals) { 
		if (v < min!)
			min = v;
		if (v > max!) 
			max = v;
	}

	const r = max! - min!;
return r === 0 ? vals.map(() => 0) : vals.map(v => (v - min!) / r);
}

function zScore(vals: number[]): number[] {
	const n = vals.length;
	let sum = 0;
	for (const v of vals) 
		sum += v;
		const mean = sum / n;
	let vari = 0;
	for (const v of vals) 
		vari += Math.pow((v - mean),2);
	const std = Math.sqrt(vari / n);

	return std === 0 ? vals.map(() => 0) : vals.map(v => (v - mean) / std);
	}

export class VDI {
	private static duck: DuckDBConnection;
	private static Transport: Transport;
	private static folder_name: string;

	constructor(duck: DuckDBConnection, transport: Transport, folder_name: string) {
		VDI.duck	= duck;
		VDI.Transport	= transport;
		VDI.folder_name = folder_name;
  		}


	private async read_db_for_vdi(){
		try{
		const res=await VDI.duck.run(
		`SELECT * from village_data_numeric`

		)
		const vdi:VDIData[]= await res.getRowObjects() as unknown as VDIData[]
		}catch(e){
			console.log("error");
		}
	}

	async start_analysis(){

	}


}