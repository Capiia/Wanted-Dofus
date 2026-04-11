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
