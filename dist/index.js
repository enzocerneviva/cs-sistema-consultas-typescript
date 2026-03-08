"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Especialidades
const cardiologia = {
    id: 1,
    nome: "Cardiologia",
};
const ortopedia = {
    id: 2,
    nome: "Ortopedia",
    descricao: "Tratamento de ossos e articulações",
};
const pediatria = {
    id: 3,
    nome: "Pediatria",
};
// Médicos
const medico1 = {
    id: 1,
    nome: "Dr. Roberto Silva",
    crm: "CRM12345",
    especialidade: cardiologia,
    ativo: true,
};
const medico2 = {
    id: 2,
    nome: "Dra. Ana Paula Costa",
    crm: "CRM54321",
    especialidade: ortopedia,
    ativo: true,
};
const medico3 = {
    id: 3,
    nome: "Dr. João Mendes",
    crm: "CRM98765",
    especialidade: pediatria,
    ativo: true,
};
// Pacientes
const paciente1 = {
    id: 1,
    nome: "Carlos Andrade",
    cpf: "123.456.789-00",
    email: "carlos@email.com",
};
const paciente2 = {
    id: 2,
    nome: "Maria Silva",
    cpf: "987.654.321-00",
    email: "maria@email.com",
    telefone: "(11) 98765-4321",
};
const paciente3 = {
    id: 3,
    nome: "Pedro Santos",
    cpf: "456.789.123-00",
    email: "pedro@email.com",
};
function criarConsulta(id, medico, paciente, data, valor) {
    return { id, medico, paciente, data, valor, status: "agendada", };
}
function confirmarConsulta(consulta) {
    return { ...consulta, status: "confirmada", };
    // o '...consulta' serve para copiar todas as propriedades da consulta original e depois sobrescrever a propriedade status
}
function cancelarConsulta(consulta) {
    if (consulta.status === "realizada") {
        return null;
    }
    return {
        ...consulta,
        status: "cancelada",
    };
}
function exibirConsulta(consulta) {
    const valorFormatado = consulta.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
    return `
    Consulta #${consulta.id}
    Médico: ${consulta.medico.nome}
    Paciente: ${consulta.paciente.nome}
    Especialidade: ${consulta.medico.especialidade.nome}
    Data: ${consulta.data.toLocaleDateString("pt-BR")}
    Valor: ${valorFormatado}
    Status: ${consulta.status}
`;
}
const consulta1 = criarConsulta(1, medico1, paciente1, new Date(), 350);
const consultaConfirmada = confirmarConsulta(consulta1);
console.log("=== CONSULTA CONFIRMADA ===");
console.log(exibirConsulta(consultaConfirmada));
//# sourceMappingURL=index.js.map