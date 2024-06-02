export interface ChamadosProps {
    id: string;
    name: string;
    status: string;
    description: string,
    created_at: Date | null;
    updated_at: Date | null;
    clienteId: string | null;
    userId: string | null;
}