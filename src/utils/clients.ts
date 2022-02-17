import { IClientItem } from '@components/ClientItem/types';

export const removeClient = (clients: IClientItem[], id: string) => {
    const newClients = clients.filter((client) => client.id !== id);
    return newClients;
};
