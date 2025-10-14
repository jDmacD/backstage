```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "config:base"
  ],
  "argocd": {
    "fileMatch": [
      "applications/.+\\.yaml$",
      "applicationsets/.+\\.yaml$"
    ]
  },
  "devbox": {
    "enabled": false
  },
  "packageRules": [
    {
      "description": "Trigger breaking release for major updates",
      "matchManagers": [
        "dockerfile",
        "argocd",
        "helm-values",
        "kustomize"
      ],
      "matchFileNames": ["!README.md"],
      "matchUpdateTypes": ["major"],
      "commitMessagePrefix": "feat(deps)!:",
      "automergeType": "pr",
      "automerge": false,
      "autoApprove": false
    },
    {
      "description": "Trigger feature release for minor updates",
      "matchManagers": [
        "dockerfile",
        "argocd",
        "helm-values",
        "kustomize"
      ],
      "matchFileNames": ["!README.md"],
      "matchUpdateTypes": ["minor"],
      "semanticCommitType": "feat",
      "automergeType": "pr",
      "automerge": true,
      "autoApprove": true
    },
    {
      "description": "Trigger fix release for patch updates",
      "matchManagers": [
        "dockerfile",
        "argocd",
        "helm-values",
        "kustomize"
      ],
      "matchFileNames": ["!README.md"],
      "matchUpdateTypes": ["patch", "digest"],
      "semanticCommitType": "fix",
      "automergeType": "pr",
      "automerge": true,
      "autoApprove": true
    }
  ]

}
```