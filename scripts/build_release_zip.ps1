param(
  [string]$ProjectRoot = "C:\Users\PC_User\Desktop\AI_Workspace\01_Projects\autonomous_revenue_bounties\bnb_hack_cmc_strategy_skill",
  [string]$CandidateName = "cmc-regime-strategy-skill"
)

$ErrorActionPreference = "Stop"

$candidate = Join-Path $ProjectRoot "public_repo_candidate\$CandidateName"
$releaseDir = Join-Path $ProjectRoot "release"
$zipPath = Join-Path $releaseDir "$CandidateName-public-candidate.zip"
$manifestPath = Join-Path $releaseDir "$CandidateName-public-candidate-manifest.json"

if (-not (Test-Path $candidate)) {
  throw "Missing candidate directory: $candidate"
}

New-Item -ItemType Directory -Force -Path $releaseDir | Out-Null

if (Test-Path $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

Compress-Archive -Path (Join-Path $candidate "*") -DestinationPath $zipPath -Force

$files = Get-ChildItem -Path $candidate -Recurse -File | Sort-Object FullName | ForEach-Object {
  [pscustomobject]@{
    path = $_.FullName.Substring($candidate.Length + 1).Replace("\", "/")
    bytes = $_.Length
    sha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $_.FullName).Hash.ToLowerInvariant()
  }
}

$manifest = [pscustomobject]@{
  generatedAt = (Get-Date).ToUniversalTime().ToString("o")
  candidate = $CandidateName
  zipPath = $zipPath
  fileCount = @($files).Count
  files = $files
}

$manifest | ConvertTo-Json -Depth 6 | Set-Content -Path $manifestPath -Encoding UTF8

Write-Output "Wrote $zipPath"
Write-Output "Wrote $manifestPath"
