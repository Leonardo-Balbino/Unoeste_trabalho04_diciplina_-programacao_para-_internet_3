//micro aplicação HTTP oferecida pelo express
import { Router } from "express";
import EventoControl from "../Controller/eventoControl.js"


const rotaEvento = Router();

const eventoControl  = new EventoControl()


rotaEvento.get("/", eventoControl.consultar ) 
.get("/:termoBusca", eventoControl.consultar)
.post("/", eventoControl.gravar)
.put("/", eventoControl.alterar)
.patch("/", eventoControl.alterar)
.delete("/",eventoControl.excluir);
export default rotaEvento;