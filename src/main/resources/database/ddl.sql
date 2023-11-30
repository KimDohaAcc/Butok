CREATE TABLE deal(
                     deal_code INT PRIMARY KEY AUTO_INCREMENT,
                     deal_gu VARCHAR(10) NOT NULL,
                     deal_gu_code CHAR(5) NOT NULL,
                     deal_dong VARCHAR(20) NOT NULL,
                     deal_dong_code CHAR(5) NOT NULL,
                     deal_bonbun INT NOT NULL,
                     deal_bubun INT NOT NULL DEFAULT 0,
                     deal_apartment_name VARCHAR(100) NOT NULL,
                     deal_floor INT NOT NULL,
                     deal_apartment_type VARCHAR(20) NOT NULL,
                     deal_rent_type VARCHAR(20) NOT NULL,
                     deal_build_year INT NOT NULL,
                     deal_contract_date CHAR(8) NOT NULL,
                     deal_rent_area DOUBLE NOT NULL,
                     deal_pyeong DOUBLE NOT NULL,
                     deal_deposit INT NOT NULL,
                     deal_monthly_rent INT DEFAULT 0,
                     deal_average_2023 DOUBLE,
                     deal_average_2022 DOUBLE,
                     deal_average_2021 DOUBLE,
                     deal_average_2020 DOUBLE
);

CREATE TABLE rent(
                     rent_code INT PRIMARY KEY AUTO_INCREMENT,
                     rent_name varchar(100) NOT NULL ,
                     rent_contract_date CHAR(8) NOT NULL ,
                     rent_deposit INT NOT NULL ,
                     rent_monthly_rent INT NOT NULL ,
                     rent_area DOUBLE NOT NULL ,
                     rent_pyeong DOUBLE NOT NULL ,
                     rent_floor INT NOT NULL
);


CREATE TABLE user
(
    user_code          char(22),
    user_id            varchar(20) UNIQUE,
    user_password      varchar(100)  not null,
    user_name          varchar(20),
    created_at         timestamp    not null,
    modified_at        timestamp,
    user_profile_image varchar(200) not null DEFAULT 'https://ibb.co/wpF6Z0P',
    user_preference    varchar(100) not null,
    primary key (user_code, user_name)
);

CREATE TABLE interests
(
    interests_code INT AUTO_INCREMENT PRIMARY KEY,
    user_code      CHAR(22),
    user_name      VARCHAR(20),
    deal_code      INT,
    FOREIGN KEY (user_code, user_name) REFERENCES `user` (user_code, user_name) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (deal_code) REFERENCES deal (deal_code) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE comment
(
    comment_code    int AUTO_INCREMENT PRIMARY KEY,
    deal_code int,
    user_code       char(22)      NOT NULL,
    user_name       varchar(20)   NOT NULL,
    comment_content varchar(1000) NOT NULL,
    comment_image1  varchar(200),
    comment_image2  varchar(200),
    comment_image3  varchar(200),
    created_at      timestamp,
    modified_at     timestamp,
    FOREIGN KEY (user_code, user_name) REFERENCES user (user_code, user_name) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (deal_code) REFERENCES deal (deal_code) ON UPDATE CASCADE ON DELETE CASCADE
);