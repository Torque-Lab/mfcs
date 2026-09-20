import type { DuckDBConnection } from "@duckdb/node-api"
import type { VillageData } from "./common_type.js";
import  { VDI } from "./vdi.js";
import Transport from "./sock.js";

export class village_data_container {

	vdi:VDI
	db:DuckDBConnection
	constructor(duck:DuckDBConnection,Transport:Transport){
		this.db=duck;
		this.vdi=new VDI(duck,Transport,"chart-visual")
		}

	public async find_vdi_build_doc(){

		try{
		await this.vdi.start_analysis()
		return true
		}catch (e){
		console.log("error at vdi_build_doc")
		return false
		}
		return false
	}

	public async find_road_connectivity_ESI_index_build_doc(){

	}

	public async find_high_agri_potential_build_doc(){

	}

	private async make_doc_health_accessibility_score(){

	}
}