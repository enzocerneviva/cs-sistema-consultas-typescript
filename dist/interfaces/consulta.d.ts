import type { Medico } from "./medico";
import type { Paciente } from "../types/paciente";
import type { StatusConsulta } from "../types/statusConsulta";
export interface Consulta {
    id: number;
    medico: Medico;
    paciente: Paciente;
    data: Date;
    valor: number;
    status: StatusConsulta;
    observacoes?: string;
}
//# sourceMappingURL=consulta.d.ts.map