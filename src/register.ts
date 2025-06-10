import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import * as fs from 'fs';
import * as path from 'path';
import {z} from 'zod';
import {createProject, createProjectStructure, createZipFromDirectory, deployProject} from "./helper.js";

export interface IRegister {
    server: McpServer;
}

export const register = ({server}: IRegister) => {
    server.tool(
        "deploy_code",
        "Deploy code to 4everland",
        {
            code_files: z.record(z.string()).describe("Map of file paths to their content"),
            project_name: z.string().describe("Name of the project")
        },
        async ({code_files, project_name}, extra) => {
            try {
                const tempDir = await createProjectStructure(project_name, code_files);
                const zipContent = await createZipFromDirectory(path.join(tempDir, 'dist'));

                const projectId = await createProject(project_name);
                const deploymentUrl = await deployProject(projectId, zipContent);

                // Cleanup temp directory
                await fs.promises.rm(tempDir, {recursive: true, force: true});

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully deployed project to ${deploymentUrl}`
                        }
                    ],
                    deploymentUrl,
                    status: "success"
                };
            } catch (error) {
                console.error("Failed to deploy code:", error);
                return {
                    content: [
                        {
                            type: "text",
                            text: `Failed to deploy: ${error instanceof Error ? error.message : String(error)}`
                        }
                    ],
                    status: "error"
                };
            }
        }
    )
};







