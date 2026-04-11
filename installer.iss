[Setup]
AppName=Wanted
AppVersion=1.1.0
AppPublisher=Capia
DefaultDirName={autopf}\Wanted
DefaultGroupName=Wanted
OutputDir=dist
OutputBaseFilename=Wanted_Setup
SetupIconFile=icons\appIcon.ico
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
PrivilegesRequired=lowest
DisableProgramGroupPage=yes
UninstallDisplayIcon={app}\Wanted.exe

[Languages]
Name: "french"; MessagesFile: "compiler:Languages\French.isl"

[Files]
Source: "dist\win-unpacked\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs

[Icons]
Name: "{group}\Wanted"; Filename: "{app}\Wanted.exe"
Name: "{autodesktop}\Wanted"; Filename: "{app}\Wanted.exe"; Tasks: desktopicon

[Tasks]
Name: "desktopicon"; Description: "Creer un raccourci sur le bureau"; GroupDescription: "Raccourcis:"

[Run]
Filename: "{app}\Wanted.exe"; Description: "Lancer Wanted"; Flags: nowait postinstall skipifsilent

[Code]
procedure MigrateOldData;
var
  OldPath, NewDir, NewPath: String;
begin
  NewDir := ExpandConstant('{userappdata}\wanted');
  NewPath := NewDir + '\state.json';

  // Ne migrer que si le nouveau fichier n'existe pas deja
  if not FileExists(NewPath) then
  begin
    // Essayer l'ancienne version Neutralino
    OldPath := ExpandConstant('{autopf}\Wanted\.storage\dofus_rech.neustorage');
    if FileExists(OldPath) then
    begin
      ForceDirectories(NewDir);
      CopyFile(OldPath, NewPath, False);
    end
    else
    begin
      // Essayer aussi l'ancien chemin Neutralino "Wanted by Capia"
      OldPath := ExpandConstant('{autopf}\Wanted by Capia\.storage\dofus_rech.neustorage');
      if FileExists(OldPath) then
      begin
        ForceDirectories(NewDir);
        CopyFile(OldPath, NewPath, False);
      end;
    end;
  end;
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssPostInstall then
    MigrateOldData;
end;
