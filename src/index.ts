import type { Especialidade } from "./types/especialidade";
import type { Paciente } from "./types/paciente";
import type { Consulta } from "./interfaces/consulta";
import type { Medico } from "./interfaces/medico";
import type { StatusConsulta } from "./types/statusConsulta";

// Especialidades
const cardiologia: Especialidade = {
    id: 1,
    nome: "Cardiologia",
};
const ortopedia: Especialidade = {
    id: 2,
    nome: "Ortopedia",
    descricao: "Tratamento de ossos e articulações",
};
const pediatria: Especialidade = {
    id: 3,
    nome: "Pediatria",
};
// Médicos
const medico1: Medico = {
    id: 1,
    nome: "Dr. Roberto Silva",
    crm: "CRM12345",
    especialidade: cardiologia,
    ativo: true,
};
const medico2: Medico = {
    id: 2,
    nome: "Dra. Ana Paula Costa",
    crm: "CRM54321",
    especialidade: ortopedia,
    ativo: true,
};
const medico3: Medico = {
    id: 3,
    nome: "Dr. João Mendes",
    crm: "CRM98765",
    especialidade: pediatria,
    ativo: true,
};
// Pacientes
const paciente1: Paciente = {
    id: 1,
    nome: "Carlos Andrade",
    cpf: "123.456.789-00",
    email: "carlos@email.com",
};
const paciente2: Paciente = {
    id: 2,
    nome: "Maria Silva",
    cpf: "987.654.321-00",
    email: "maria@email.com",
telefone: "(11) 98765-4321",
};
const paciente3: Paciente = {
    id: 3,
    nome: "Pedro Santos",
    cpf: "456.789.123-00",
    email: "pedro@email.com",
};

function criarConsulta(id: number, medico: Medico, paciente: Paciente, data: Date, valor: number): Consulta {
    return {id, medico, paciente, data, valor, status: "agendada"};
}

function confirmarConsulta(consulta: Consulta): Consulta {
    return {...consulta, status: "confirmada",}; 
    // o '...consulta' serve para copiar todas as propriedades da consulta original e depois sobrescrever a propriedade status
}

function cancelarConsulta(consulta: Consulta): Consulta | null {
    if (consulta.status === "realizada") {
        return null;
    }
    return {
        ...consulta,
        status: "cancelada",
    };
}

function consultaRealizada(consulta: Consulta): Consulta | null {
    if (consulta.status !== "confirmada") {
        return null;
    } else {
        return {
            ...consulta,
            status: "realizada",
        };
    };
}

function listarConsultasPorStatus(consultas: Consulta[], status: StatusConsulta): Consulta[] {
    return consultas.filter((consulta) => consulta.status === status);
}

function listarConsultasFuturas(consultas: Consulta[]): Consulta[] {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Zera horas para comparar apenas a data
    return consultas.filter((consulta) => consulta.data >= hoje);
}

function exibirConsulta(consulta: Consulta): string {
    
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

function calcularFaturamento(consultas: Consulta[]): number {
    return consultas
        .filter((consulta) => consulta.status === "realizada")
        .reduce((total, consulta) => total + consulta.valor, 0);
}

// Testes da Aplicação

// Criar uma consulta
const consulta1 = criarConsulta(1, medico1, paciente1, new Date(), 350);

// Confirmar a consulta
const consultaConfirmada = confirmarConsulta(consulta1);

// Exibir a consulta confirmada
console.log("=== CONSULTA CONFIRMADA ===");
console.log(exibirConsulta(consultaConfirmada));

// Criando uma lista de consultas para teste

console.log("=== LISTA DE CONSULTAS DE TESTE ===");
console.log("");

let consultasTeste: Consulta[] = [
    criarConsulta(2, medico2, paciente2, new Date(2026, 2, 20, 9, 0), 450),
    criarConsulta(3, medico3, paciente3, new Date(2026, 2, 21, 14, 30), 250),
    criarConsulta(4, medico1, paciente2, new Date(2026, 2, 22, 11, 0), 300),
    criarConsulta(5, medico2, paciente1, new Date(2026, 2, 23, 16, 15), 400)
];

// Confirmar a primeira consulta da lista de teste
if (consultasTeste[0]) {
    consultasTeste[0] = confirmarConsulta(consultasTeste[0]);
}

// Cancelar a segunda consulta da lista de teste
if (consultasTeste[1]) {
    consultasTeste[1] = cancelarConsulta(consultasTeste[1])!;
}

// Marcar a terceira consulta como realizada (tem que confirmar ela antes)

if (consultasTeste[2]) {
    consultasTeste[2] = confirmarConsulta(consultasTeste[2]);
}

if (consultasTeste[2]) {  
    consultasTeste[2] = consultaRealizada(consultasTeste[2])!;
}

// Listar consultas futuras
const consultasFuturas: Consulta[] = listarConsultasFuturas(consultasTeste);

// Exibir consultas futuras
console.log("=== CONSULTAS FUTURAS ===");
consultasFuturas.forEach((consulta) => console.log(exibirConsulta(consulta)));
console.log("");

// Listar consultas agendadas
const consultas: Consulta[] = listarConsultasPorStatus(consultasTeste, "agendada");

// Exibir consultas agendadas
console.log("=== CONSULTAS AGENDADAS ===");
consultas.forEach((consulta) => console.log(exibirConsulta(consulta)));
console.log("");

// Listar consultas confirmadas
const consultasConfirmadas: Consulta[] = listarConsultasPorStatus(consultasTeste, "confirmada");

// Exibir consultas confirmadas
console.log("=== CONSULTAS CONFIRMADAS ===");
consultasConfirmadas.forEach((consulta) => console.log(exibirConsulta(consulta)));
console.log("");

// Listar consultas canceladas
const consultasCanceladas: Consulta[] = listarConsultasPorStatus(consultasTeste, "cancelada");

// Exibir consultas canceladas
console.log("=== CONSULTAS CANCELADAS ===");
consultasCanceladas.forEach((consulta) => console.log(exibirConsulta(consulta)));
console.log("");

// Listar consultas realizadas
const consultasRealizadas: Consulta[] = listarConsultasPorStatus(consultasTeste, "realizada");

// Exibir consultas realizadas
console.log("=== CONSULTAS REALIZADAS ===");
consultasRealizadas.forEach((consulta) => console.log(exibirConsulta(consulta)));
console.log("");

// Cálculo do faturamento
const faturamento = calcularFaturamento(consultasTeste);
console.log("=== FATURAMENTO TOTAL ===");
console.log(faturamento.toLocaleString("pt-BR", {style: "currency", currency: "BRL",}));
