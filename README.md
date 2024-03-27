## Sobre o projeto
Projeto desenvolvido para a disciplina de Programação Para a Internet I, ministrada pelo professor Ely Miranda. A aplicação consiste em um buscador que possui alguns critérios de ranqueamento de páginas baseados em pontuações. O código foi desenvolvido utilizando recursos de orientação a objetos (como classes, herança, etc) e estrutura de dados.

## Fluxo da aplicação:
- Inicialmente, ao rodar o projeto, todas as páginas são indexadas.
- Após o processo de indexação, é exibido o menu principal da aplicação, que contém as seguintes opções:
    * 1 - Buscar
    * 2 - Alterar critérios de ranqueamento
    * 3 - Sair da aplicação
- Ao optar pela opção "Buscar", será solicitado do usuário o termo a ser buscado.
- Após digitar o termo, a aplicação vai realizar a busca nas páginas indexadas e fará o ranqueamento das mesmas de acordo com os critérios estabelecidos, além de destacar o termo buscado nos trechos em que aparecem e mostrar a pontuação total de cada página.
- Ao optar pela opção "Alterar critérios de ranqueamento", o usuário deverá informar qual parâmetro ele deseja que seja alterado.
- Após isso, o usuário deverá digitar o novo valor, e uma mensagem de confirmação da mudança será exibida.
- Ao optar pela opção "Sair da aplicação", o programa é encerrado por completo.

## Como rodar o projeto:
- Baixe o arquivo .zip do projeto, disponível na página inicial do repositório.
- Descompacte o arquivo e extraia a pasta que contém todo o projeto.
- Abra o projeto no VSCode, caso queira analisar o código. Os arquivos principais do projeto se encontram na pasta "src".
- Usando o terminal dentro da pasta do projeto (seja o terminal do seu sistema operacional ou o terminal integrado ao VSCode), insira o comando:
```node build/main.js```
- O projeto deverá rodar normalmente.

## Contribuidores:
- Hermínio Neto
- Luis Felipe Patrocínio
- Ryan Faustino
