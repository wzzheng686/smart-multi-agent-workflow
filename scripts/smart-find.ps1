# smart-find.ps1 - Search both local and remote skills
# Usage: .\smart-find.ps1 <query>

param(
    [Parameter(Mandatory=$true)]
    [string]$Query
)

# Colors
$CYAN = "`e[36m"
$GREEN = "`e[32m"
$YELLOW = "`e[33m"
$DIM = "`e[2m"
$RESET = "`e[0m"
$BOLD = "`e[1m"

Write-Host ""
Write-Host "${BOLD}Searching for: ${CYAN}$Query${RESET}"
Write-Host ""

# Search local skills
Write-Host "${BOLD}Local Installed Skills:${RESET}"
Write-Host ""

$globalSkillsDir = "$env:USERPROFILE\.agents\skills"
$opencodeSkillsDir = "$env:USERPROFILE\.config\opencode\skills"
$claudeSkillsDir = "$env:USERPROFILE\.claude\skills"

$localSkills = @()

# Search in global skills directory
if (Test-Path $globalSkillsDir) {
    Get-ChildItem -Path $globalSkillsDir -Directory | ForEach-Object {
        $skillMd = Join-Path $_.FullName "SKILL.md"
        if (Test-Path $skillMd) {
            $content = Get-Content $skillMd -Raw
            if ($content -match "name:\s*(.+)") {
                $name = $matches[1].Trim()
                if ($name -like "*$Query*" -or $_.Name -like "*$Query*") {
                    $localSkills += [PSCustomObject]@{
                        Name = $name
                        Path = $_.FullName
                        Scope = "global"
                        Source = "local"
                    }
                }
            }
        }
    }
}

# Search in OpenCode skills directory
if (Test-Path $opencodeSkillsDir) {
    Get-ChildItem -Path $opencodeSkillsDir -Directory | ForEach-Object {
        $skillMd = Join-Path $_.FullName "SKILL.md"
        if (Test-Path $skillMd) {
            $content = Get-Content $skillMd -Raw
            if ($content -match "name:\s*(.+)") {
                $name = $matches[1].Trim()
                if ($name -like "*$Query*" -or $_.Name -like "*$Query*") {
                    $localSkills += [PSCustomObject]@{
                        Name = $name
                        Path = $_.FullName
                        Scope = "opencode"
                        Source = "local"
                    }
                }
            }
        }
    }
}

# Search in Claude skills directory
if (Test-Path $claudeSkillsDir) {
    Get-ChildItem -Path $claudeSkillsDir -Directory | ForEach-Object {
        $skillMd = Join-Path $_.FullName "SKILL.md"
        if (Test-Path $skillMd) {
            $content = Get-Content $skillMd -Raw
            if ($content -match "name:\s*(.+)") {
                $name = $matches[1].Trim()
                if ($name -like "*$Query*" -or $_.Name -like "*$Query*") {
                    $localSkills += [PSCustomObject]@{
                        Name = $name
                        Path = $_.FullName
                        Scope = "claude"
                        Source = "local"
                    }
                }
            }
        }
    }
}

if ($localSkills.Count -gt 0) {
    foreach ($skill in $localSkills) {
        Write-Host "  ${GREEN}$($skill.Name)${RESET} ${DIM}($($skill.Scope))${RESET}"
        Write-Host "  ${DIM}└ $($skill.Path)${RESET}"
        Write-Host ""
    }
} else {
    Write-Host "  ${DIM}No local skills found matching '$Query'${RESET}"
    Write-Host ""
}

# Search remote skills
Write-Host "${BOLD}Remote Skills:${RESET}"
Write-Host ""

try {
    $url = "https://skills.sh/api/search?q=$Query&limit=6"
    $response = Invoke-RestMethod -Uri $url -Method Get -ErrorAction Stop
    
    if ($response.skills -and $response.skills.Count -gt 0) {
        foreach ($skill in ($response.skills | Select-Object -First 6)) {
            $installs = if ($skill.installs) { " $CYAN$($skill.installs) installs$RESET" } else { "" }
            $pkg = if ($skill.source) { $skill.source } else { $skill.slug }
            Write-Host "  ${CYAN}$pkg@$($skill.name)${RESET}$installs"
            Write-Host "  ${DIM}└ https://skills.sh/$($skill.slug)${RESET}"
            Write-Host ""
        }
    } else {
        Write-Host "  ${DIM}No remote skills found for '$Query'${RESET}"
        Write-Host ""
    }
} catch {
    Write-Host "  ${YELLOW}Could not search remote registry${RESET}"
    Write-Host ""
}

Write-Host "${DIM}Tip: Use 'npx skills add <owner/repo@skill>' to install remote skills${RESET}"
Write-Host "${DIM}     Local skills are already installed and ready to use${RESET}"
Write-Host ""
