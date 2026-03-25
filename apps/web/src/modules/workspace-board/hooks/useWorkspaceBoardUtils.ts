import { WorkspaceBoardConfig, WorkspaceBoardUtils } from "../types/workspace-board.types";
import { enrichBoardData } from "../utils/enrichBoardData";
import { generateBoardUrl } from "../utils/generateBoardUrl";
import { isValidBoardPath } from "../utils/isValidBoardPath";
import { parseBoardPath } from "../utils/parseBoardPath";

/**
 * React hook utility for workspace board operations
 * (For use within React components)
 */
export function useWorkspaceBoardUtils(config: WorkspaceBoardConfig = {}) : WorkspaceBoardUtils  {
    const validatePath = (pathname: string) => isValidBoardPath(pathname, config);
    const parsePath = (pathname: string) => parseBoardPath(pathname);
    const enrichPath = (pathname: string) => enrichBoardData(parseBoardPath(pathname));
    
    return {
        validatePath,
        parsePath,
        enrichPath,
        generateUrl: generateBoardUrl,
        config: { minDepth: 1, maxDepth: 3, ...config },
    };
}