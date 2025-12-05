# Script para configurar o alias 'gemini' no PowerShell
Write-Host "Configurando alias 'gemini'..." -ForegroundColor Cyan

$npmPath = "$env:APPDATA\npm"
$ps5Profile = "$env:USERPROFILE\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1"
$ps7Profile = "$env:USERPROFILE\Documents\PowerShell\Microsoft.PowerShell_profile.ps1"

# Verificar se o gemini.cmd existe
$geminiCmd = Join-Path $npmPath "gemini.cmd"
if (-not (Test-Path $geminiCmd)) {
    Write-Host "ERRO: gemini.cmd nao encontrado em $npmPath" -ForegroundColor Red
    exit 1
}

Write-Host "Gemini CLI encontrado em: $geminiCmd" -ForegroundColor Green

# Função para configurar perfil
function Configurar-Perfil {
    param($profilePath)
    
    if (-not $profilePath) { return }
    
    $dir = Split-Path $profilePath
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Diretorio criado: $dir" -ForegroundColor Yellow
    }
    
    $aliasCode = @"
function gemini {
    & '$geminiCmd' @args
}
"@
    
    $exists = Test-Path $profilePath
    if ($exists) {
        $content = Get-Content $profilePath -Raw -ErrorAction SilentlyContinue
        if ($content -and $content -match 'function gemini') {
            Write-Host "Alias ja existe em: $profilePath" -ForegroundColor Yellow
            return
        }
        Add-Content -Path $profilePath -Value "`n$aliasCode"
    } else {
        Set-Content -Path $profilePath -Value $aliasCode
    }
    
    Write-Host "Perfil configurado: $profilePath" -ForegroundColor Green
}

# Configurar ambos os perfis
Configurar-Perfil -profilePath $ps5Profile
Configurar-Perfil -profilePath $ps7Profile

Write-Host "`nConfiguracao concluida!" -ForegroundColor Cyan
Write-Host "Reinicie o terminal ou execute: . `$PROFILE" -ForegroundColor Yellow
Write-Host "Depois, voce pode usar o comando 'gemini' diretamente." -ForegroundColor Yellow



