import type { DuckDBConnection } from "@duckdb/node-api";
import { DevelopmentAnalysis } from "../analysis-in/seed.js";
import process from "node:process";
import { village_data_container } from "../analysis-in/village.js";
import Transport from "../analysis-in/sock.js";

const input_csv_path=process.cwd()
const db_name= "mfcs_duck.db"
const seed=1

let duck!:DuckDBConnection
let isconnection_fine_to_run_query=false


const boot_strap=new DevelopmentAnalysis(db_name,
				input_csv_path+"/raw_data/MA2020_UTTARAKHAND.csv"
				)
	try {
	 const response= await boot_strap.duck_db_init()
	 	if(response.db_status){
 			duck=response.duck!!
			isconnection_fine_to_run_query=true;
			console.log("db_ready and seed status:",seed)
	 	}
	 	if (seed){
			console.log("db name:",db_name)
			await boot_strap.load_csv_create_master_table()
			await boot_strap.rename_column_in_master_table()
			await boot_strap.create_district_wise_table()
			boot_strap.get_db_metadata()
			await boot_strap.normalised_all_cell_to_numeric_string()

			const start_boot_strap= new village_data_container(duck,new Transport())
			await start_boot_strap.find_vdi_build_doc()
		 }
		}catch(e){
			console.log ("db init failed",e)
		}

