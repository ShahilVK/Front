import * as signalR from "@microsoft/signalr";

export const createUserHubConnection = (token) => {
  return new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7155/hubs/user", {
      accessTokenFactory: () => token
    })
    .withAutomaticReconnect()
    .build();
};
