package com.example.RentACarV3.Model.DTOs;

public class StatusDTO {

    private Long completed;
    private Long cancelled;

    public StatusDTO(Long completed, Long cancelled) {
        this.completed = completed;
        this.cancelled = cancelled;
    }

    public Long getCompleted() {
        return completed;
    }
    public void setCompleted(Long completed) {
        this.completed = completed;
    }

    public Long getCancelled() {
        return cancelled;
    }
    public void setCancelled(Long cancelled) {
        this.cancelled = cancelled;
    }
}