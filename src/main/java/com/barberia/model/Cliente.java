package com.barberia.model;

public class Cliente {

    private int idCli;
    private String nomCli;
    private String apeCli;
    private String telCli;
    private String correo;
    private String contraCli;

    public Cliente() {
    }

    public Cliente(String nomCli, String apeCli, String telCli,
                String correo, String contraCli) {
        this.nomCli = nomCli;
        this.apeCli = apeCli;
        this.telCli = telCli;
        this.correo = correo;
        this.contraCli = contraCli;
    }

    public Cliente(int idCli, String nomCli, String apeCli,
                String telCli, String correo, String contraCli) {
        this.idCli = idCli;
        this.nomCli = nomCli;
        this.apeCli = apeCli;
        this.telCli = telCli;
        this.correo = correo;
        this.contraCli = contraCli;
    }

    public int getIdCli() {
        return idCli;
    }

    public void setIdCli(int idCli) {
        this.idCli = idCli;
    }

    public String getNomCli() {
        return nomCli;
    }

    public void setNomCli(String nomCli) {
        this.nomCli = nomCli;
    }

    public String getApeCli() {
        return apeCli;
    }

    public void setApeCli(String apeCli) {
        this.apeCli = apeCli;
    }

    public String getTelCli() {
        return telCli;
    }

    public void setTelCli(String telCli) {
        this.telCli = telCli;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContraCli() {
        return contraCli;
    }

    public void setContraCli(String contraCli) {
        this.contraCli = contraCli;
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "idCli=" + idCli +
                ", nomCli='" + nomCli + '\'' +
                ", apeCli='" + apeCli + '\'' +
                ", telCli='" + telCli + '\'' +
                ", correo='" + correo + '\'' +
                '}';
    }
}