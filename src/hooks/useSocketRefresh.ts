import { useEffect } from "react";
import type { Socket } from "socket.io-client";
type UseSocketRefreshProps = {
    socket: Socket | null;
    refetch: () => void;
    eventName?: string;
    shouldRefetch?: (data: any) => boolean;
};

const useSocketRefresh = ({
    socket,
    refetch,
    eventName = "refresh_todos",
    shouldRefetch = () => true
}: UseSocketRefreshProps) => {
    useEffect(() => {
        if (!socket) return;

        const handleRefresh = (data?: any) => {
            if (shouldRefetch(data)) {
                refetch();
                console.log(data);
            }
        };
        socket.on(eventName, handleRefresh);

        return () => {
            socket.off(eventName, handleRefresh);
        };
    }, [socket, refetch, eventName, shouldRefetch]);
};

export default useSocketRefresh;