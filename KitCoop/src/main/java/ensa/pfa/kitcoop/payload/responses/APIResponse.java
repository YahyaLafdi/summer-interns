package ensa.pfa.kitcoop.payload.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor

public class APIResponse {
    private Integer status;
    private Object data;
    private Object message;
}

