package com.example.teamtok.domain.Preference;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Preference {
    private String dealRentType;
    private String dealApartmentType;
    private int depositScale1;
    private int depositScale2;
    private int pyeongScale1;
    private int pyeongScale2;
}
