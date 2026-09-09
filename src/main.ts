import type { DuckDBConnection } from "@duckdb/node-api";
import { DevelopmentAnalysis } from "../analysis-in/group.js";
import process from "node:process";

const input_csv_path=process.cwd()
const db_name= "mfcs_duck.db"
const seed=1

let duck:DuckDBConnection
let isconnection_fine_to_run_query=false


const analysis=new DevelopmentAnalysis(db_name,
				input_csv_path+"/raw_data/MA2020_UTTARAKHAND.csv"
				)
	try {
	 const response= await analysis.duck_db_init()
	 	if(response.db_status){
 			duck=response.duck!!
			isconnection_fine_to_run_query=true;
			console.log("db_ready and seed status:",seed)
	 	}
	 	if (seed){
			console.log("db name:",db_name)
			await analysis.load_csv_create_master_table()
			await analysis.rename_column_in_master_table()
			await analysis.create_district_wise_table()
			console.log("normalised table : village_data_numeric")
			analysis.get_db_metadata()
			await analysis.normalised_all_cell_to_numeric_string()
		 }
		}catch(e){
			console.log ("db init failed",e)
		}

