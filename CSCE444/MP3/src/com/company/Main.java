package com.company;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {

    public static void main(String[] args) throws IOException{

        if (args.length != 3) {
            System.err.println("Usage: java SDServer <port number> <max clients> <message>");
            System.exit(1);
        }

        System.out.print("Welcome to the SD Server\n");

        int portNumber = Integer.parseInt(args[0]);
        int numOfClients = Integer.parseInt(args[1]);
        String message = String.valueOf(args[2]);
        System.out.println("Your server is running on port: " + portNumber + "\n");

        SDServer server = new SDServer(portNumber, numOfClients, message);
        new Thread(server).start();

        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;

        System.out.println("Enter \\stopserver to end program.");       // Server stops running when server admin enters \\stopserver
        while ((line = reader.readLine()) != null && !line.equals("\\stopserver")) {
            System.out.println(line);
        }
        reader.close();

        System.out.println("Stopping Server");
        server.stop();
    }
}
