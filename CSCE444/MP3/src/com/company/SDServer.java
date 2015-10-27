package com.company;
import java.net.ServerSocket;
import java.net.Socket;
import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
/**
 * Created by Alejandro on 10/19/2015.
 */

public class SDServer implements Runnable {
    //Thisa is the server.
    protected int          serverPort   = 8080;
    protected ServerSocket serverSocket = null;
    protected boolean      isStopped    = false;
    protected Thread       runningThread= null;
    protected ExecutorService threadPool = null;
    protected String outputMessage = "";

    public SDServer(int port, int numOfClients, String Message){
        this.serverPort = port;
        this.threadPool = Executors.newFixedThreadPool(numOfClients);
        this.outputMessage = Message + "\n\n";
    }

    public void run(){
        synchronized(this){
            this.runningThread = Thread.currentThread();
        }
        openServerSocket();
        while(! isStopped()){
            Socket clientSocket;
            try {
                clientSocket = this.serverSocket.accept();
            } catch (IOException e) {
                if(isStopped()) {
                    System.out.println("Server Stopped.") ;
                    break;
                }
                throw new RuntimeException(
                        "Error accepting client connection", e);
            }
            this.threadPool.execute(
                    new SDClient(clientSocket,outputMessage));
        }
        this.threadPool.shutdown();
        System.out.println("Server Stopped.") ;
    }


    private synchronized boolean isStopped() {
        return this.isStopped;
    }

    public synchronized void stop(){
        this.isStopped = true;
        try {
            this.serverSocket.close();
        } catch (IOException e) {
            throw new RuntimeException("Error closing server", e);
        }
    }

    private void openServerSocket() {
        try {
            this.serverSocket = new ServerSocket(this.serverPort);
        } catch (IOException e) {
            throw new RuntimeException("Cannot open port: " + this.serverPort, e);
        }
    }
}

