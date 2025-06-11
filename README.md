# 4EVERLAND Hosting MCP Server

[![Version](https://img.shields.io/badge/version-0.1.2-blue.svg)](https://www.npmjs.com/package/@4everland/4ever-mcpserver)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D20.12.2-green.svg)](https://nodejs.org/)

A Model Context Protocol (MCP) server tool that enables AI assistants to deploy static websites to 4EVERLAND's
decentralized hosting services.

## Overview

This MCP server allows AI assistants like Claude to deploy websites directly to 4EVERLAND's hosting services across
multiple platforms (IPFS, Arweave, Internet Computer, and BNB GreenField).

## Installation

```bash
npm install @4everland/4ever-mcpserver
```

Or run directly:

```bash
npx @4everland/4ever-mcpserver@latest serve
```

## Requirements

- Node.js >= 20.12.2
- 4EVERLAND account with API token
    - [Sign up for 4EVERLAND](https://4everland.org/hosting)
    - Get your API token from the 4EVERLAND dashboard

## Environment Variables

| Variable  | Description                         | Default                         |
|-----------|-------------------------------------|---------------------------------|
| `TOKEN`   | Your 4EVERLAND API token (required) | -                               |
| `API_URL` | 4EVERLAND API URL                   | `https://cli-api.4everland.org` |

## AI Assistant Integration

### Claude Desktop

Add the following to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "4ever-mcpserver": {
      "command": "npx",
      "args": [
        "@4everland/4ever-mcpserver@latest",
        "serve"
      ],
      "env": {
        "TOKEN": "your-4ever-hosting-auth-token"
      }
    }
  }
}
```

## API Reference

### Tool: `deploy_site`

Deploys code to 4EVERLAND hosting platforms.

#### Parameters

| Parameter      | Type                                           | Description                                                                   |
|----------------|------------------------------------------------|-------------------------------------------------------------------------------|
| `code_files`   | `Record<string, string>`                       | Map of file paths to their content                                            |
| `project_name` | `string`                                       | Project name (alphanumeric, underscore, hyphen; cannot start/end with hyphen) |
| `project_id`   | `string` (optional)                            | Existing project ID to deploy to (new project created if omitted)             |
| `platform`     | `"IPFS"` \| `"AR"` \| `"IC"` \| `"GREENFIELD"` | Storage platform to deploy to (default: `"IPFS"`)                             |

#### Response

On success:

```json
{
  "status": "success",
  "content": [
    {
      "type": "text",
      "text": "Successfully deployed project to https://example.4everland.app"
    }
  ],
  "deploymentUrl": "https://example.4everland.app",
  "project_id": "project123"
}
```

On error:

```json
{
  "status": "error",
  "content": [
    {
      "type": "text",
      "text": "Failed to deploy: [error message]"
    }
  ]
}
```

## Development

```bash
# Clone repository
git clone https://github.com/4everland/4everland-hosting-mcp-server.git

# Install dependencies
npm install

# Build the project
npm run build

# Run the server locally
npm run serve
```

## License

[MIT](LICENSE)