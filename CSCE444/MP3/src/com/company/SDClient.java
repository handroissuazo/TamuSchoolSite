package com.company;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.IOException;
import java.net.Socket;
import java.io.BufferedReader;

/**
 * Created by Handro on 10/19/2015.
 */

public class SDClient implements Runnable{
    // Member variables
    protected Socket clientSocket = null;
    protected String serverText   = null;

    //Constructor
    public SDClient(Socket clientSocket, String serverText) {
        this.clientSocket = clientSocket;
        this.serverText   = serverText;
    }

    // Client Thread running
    public void run() {
        try {
            InputStream input  = clientSocket.getInputStream();
            OutputStream output = clientSocket.getOutputStream();
            long time = System.currentTimeMillis();
            System.out.print("Client on port: " + clientSocket.getPort() + " has connected.\n");
            output.write((this.serverText).getBytes());

            //Buffered Reader per the MP3 stuff.
            BufferedReader reader = new BufferedReader(new InputStreamReader(input));
            String line;
            while ((line = reader.readLine()) != null && !line.equals("\\disconnect")) {        //Client closes connection with "\disconnect"
                System.out.println("Client on "+ clientSocket.getPort() + " says: " + line);
            }
            reader.close();

            System.out.print("Client on port: " + clientSocket.getPort() + " has disconnected.\n");
            output.close();
            input.close();
        } catch (IOException e) {
            //report exception somewhere.
            e.printStackTrace();
        }
    }

}