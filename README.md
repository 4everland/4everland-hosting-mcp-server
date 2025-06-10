# 4EVERLAND Hosting MCP Server

A Model Context Protocol (MCP) server tool for deploying code to 4EVERLAND's IPFS hosting service.

## Usage

```bash
npx @4everland/4ever-mcpserver@latest serve 
```

## Requirements

- Node.js >= 20.12.2
- 4EVERLAND account with API token

## Environment Setup

Set the following environment variables:

```bash
export TOKEN=your_4everland_api_token
export API_URL=https://cli-api.4everland.org  # Default API URL
```

## Claude Desktop configuration

```json
{
  "mcpServers": {
    "4ever-mcpserver": {
      "command": "npx",
      "args": [
        "@4everland/4ever-mcpserver@latest",
        "serve"
      ],
      "env":{
        "TOKEN":"your-4ever-hosting-auth-token"
      }
    }
  }
}
```

## API Reference

This server implements an MCP tool:

### `deploy_site`

Deploys code to 4EVERLAND hosting.

**Parameters:**
- `code_files`: Record<string, string> - Map of file paths to their content
- `project_name`: string - Name of the project

**Returns:**
- `status`: "success" | "error"
- `content`: Array of text content
- `deploymentUrl`: URL of the deployed project (on success)

## Development

```bash
# Build the project
npm run build

# Run the server locally
npm run serve
```

## License

MIT