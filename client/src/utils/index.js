import axios from "axios";

const isDevelopment = window.location.hostname.includes("localhost");

const getServer = () =>{
   return isDevelopment ? "http://localhost:8080" : "";
}
export default getServer;