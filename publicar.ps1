# Script de Publicação Automática - Primazia Marcenaria no GitHub

# 1. Solicita o nome de usuário do GitHub do cliente
Write-Host ""
Write-Host "==========================================================" -ForegroundColor Gold
Write-Host "  CONFIGURAÇÃO E PUSH AUTOMÁTICO PARA O GITHUB" -ForegroundColor Gold
Write-Host "==========================================================" -ForegroundColor Gold
Write-Host ""
Write-Host "Antes de continuar, certifique-se de ter criado um repositório vazio"
Write-Host "chamado 'Primazia-Marcenaria' em sua conta do GitHub:"
Write-Host "👉 https://github.com/new" -ForegroundColor Cyan
Write-Host ""

$username = Read-Host "Digite o seu nome de usuário (username) do GitHub"
if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Error "Nome de usuário inválido. Operação cancelada."
    Exit
}

$repoUrl = "https://github.com/$username/Primazia-Marcenaria.git"

# 2. Configura a identidade local temporária se necessário
git config user.name "Jonas"
git config user.email "jonas@example.com"

# 3. Adiciona ou atualiza o repositório remoto origin
Write-Host ""
Write-Host "Configurando o repositório remoto..." -ForegroundColor Yellow
if (git remote) {
    git remote remove origin
}
git remote add origin $repoUrl

# 4. Tenta realizar o commit e push
Write-Host "Enviando arquivos para o GitHub..." -ForegroundColor Yellow
Write-Host "Caso solicitado pelo Windows, autorize o acesso à sua conta do GitHub." -ForegroundColor Green
Write-Host ""

git branch -M main
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "  CÓDIGO ENVIADO COM SUCESSO!" -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Seu repositório está online em:"
    Write-Host "👉 https://github.com/$username/Primazia-Marcenaria" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "COMO ATIVAR A VISUALIZAÇÃO PARA O SEU CLIENTE (GitHub Pages):" -ForegroundColor Gold
    Write-Host "1. Acesse o link acima do seu repositório no navegador."
    Write-Host "2. Clique na aba 'Settings' (Configurações) no topo direito."
    Write-Host "3. No menu lateral esquerdo, clique em 'Pages'."
    Write-Host "4. Em 'Build and deployment', abaixo de 'Branch', mude de 'None' para 'main'."
    Write-Host "5. Deixe a pasta como '/ (root)' e clique em 'Save' (Salvar)."
    Write-Host "6. Aguarde 1 minuto. O link público será gerado no topo da página."
    Write-Host "   Exemplo de link: https://$username.github.io/Primazia-Marcenaria/" -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Ocorreu um erro ao enviar os arquivos." -ForegroundColor Red
    Write-Host "Verifique se você criou o repositório no GitHub com o nome exato 'Primazia-Marcenaria'."
}
Write-Host ""
Read-Host "Pressione Enter para fechar..."
