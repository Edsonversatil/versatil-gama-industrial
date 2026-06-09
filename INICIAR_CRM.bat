@echo off
title Servidor CRM Versatil
echo ===================================================
echo Iniciando o Servidor CRM da Versatil...
echo Por favor, nao feche esta janela preta.
echo Abrindo o CRM no seu navegador automaticamente...
echo ===================================================
start http://localhost:8080/crm
node server.js
pause
