# PROTOCOLO DE ENGENHARIA – CRM VERSÁTIL (MODO “ENGENHARIA NUCLEAR” – ZERO REGRESSÃO)

Antes de qualquer alteração neste CRM, siga obrigatoriamente este protocolo.

## REGRA Nº 1 – BACKUP OBRIGATÓRIO
Criar backup completo do projeto antes de qualquer modificação.
O backup deve permitir restauração integral caso qualquer funcionalidade apresente regressão.
Nunca editar diretamente arquivos críticos sem backup.

## REGRA Nº 2 – NÃO REESCREVER O QUE JÁ FUNCIONA
O objetivo NÃO é reescrever módulos existentes.
O objetivo é EVOLUIR o sistema preservando 100% das funcionalidades atuais.
Qualquer alteração deve ser mínima e localizada.
Não alterar layout, fluxo ou lógica que já esteja funcionando.

## REGRA Nº 3 – ENTENDER ANTES DE ALTERAR
Antes de modificar qualquer código:
* localizar todos os arquivos envolvidos;
* entender o fluxo completo;
* identificar dependências;
* verificar impactos em outras telas.
Somente depois iniciar alterações.

## REGRA Nº 4 – EVOLUÇÃO INCREMENTAL
Implementar uma melhoria por vez.
Após cada melhoria: testar; validar; somente então iniciar a próxima.
Nunca implementar diversas alterações simultaneamente.

## REGRA Nº 5 – REUTILIZAR O QUE JÁ EXISTE
Sempre utilizar componentes, funções e estruturas existentes.
Evitar duplicação de código. Evitar criar novos módulos quando os atuais puderem ser estendidos.

## REGRA Nº 6 – FONTE ÚNICA DA VERDADE
Todos os dados encontrados por Busca Local, E-mails, Internet e IA devem ser consolidados em uma única estrutura.
As telas (Revisar Dados, Evidências do Score, Dossiê Comercial, CRM, Campanha) devem consumir exatamente essa mesma base consolidada. Nenhuma tela deve manter dados independentes.

## REGRA Nº 7 – REVISAR DADOS
A tela Revisar Dados deve abrir totalmente preenchida.
Ela deve permitir apenas: corrigir; complementar; aprovar.
Nunca obrigar o usuário a redigitar informações que a IA já encontrou.

## REGRA Nº 8 – PERSISTÊNCIA
Toda informação aprovada deve ser gravada permanentemente no banco.
Nenhum dado confirmado pode ser perdido em novas análises.

## REGRA Nº 9 – AUDITORIA
Toda alteração automática deve registrar: origem (IA, Busca Local, E-mail, Internet ou Manual); data; nível de confiança.

## REGRA Nº 10 – TESTE DE REGRESSÃO
Antes de concluir qualquer tarefa, verificar: Pesquisa Local, Pesquisa Web, Pesquisa IA, Revisar Dados, Evidências do Score, Dossiê Comercial, Campanhas, Aprovação Manual, Fluxo de Refazer, Banco de Dados, Histórico de E-mails.
Nenhuma funcionalidade existente pode deixar de funcionar.
Caso qualquer regressão seja detectada: PARAR imediatamente. Corrigir antes de prosseguir.

## REGRA Nº 11 – IMPLEMENTAÇÃO
Sempre apresentar:
1. O que será alterado.
2. Quais arquivos serão modificados.
3. Quais riscos existem.
4. Como será testado.
5. Resultado esperado.
Somente depois executar.

## OBJETIVO FINAL
Evoluir continuamente o CRM Versátil, preservando a estabilidade do sistema.
A prioridade absoluta é: ZERO REGRESSÃO + EVOLUÇÃO CONTÍNUA + DADOS CONSOLIDADOS + BACKUP GARANTIDO.
