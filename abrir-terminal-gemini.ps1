# Script para abrir um novo terminal com Gemini CLI configurado
$scriptBlock = @"
cd '$PWD'
Write-Host '=== Terminal Gemini CLI ===' -ForegroundColor Green
Write-Host 'Branch atual: ' -NoNewline
git branch --show-current
Write-Host ''
Write-Host 'Gemini CLI configurado!' -ForegroundColor Cyan
Write-Host ''
Write-Host 'Comandos disponiveis:' -ForegroundColor Yellow
Write-Host '  gemini --version          - Ver versao' -ForegroundColor White
Write-Host '  gemini auth login         - Fazer login' -ForegroundColor White
Write-Host '  gemini --help             - Ver ajuda' -ForegroundColor White
Write-Host ''

# Configurar alias do gemini
function gemini {
    cmd /c 'C:\Users\igor\AppData\Roaming\npm\gemini.cmd' @args
}

Write-Host 'Digite "gemini" para começar!' -ForegroundColor Green
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $scriptBlock



