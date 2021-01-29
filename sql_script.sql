create database if not exists bar_app;
use bar_app;
# create common user for all temmates
create user if not exists 'djtavr'@'localhost' identified by 'djtavr';
grant all privileges on bar_app.* to 'djtavr'@'localhost'; 

