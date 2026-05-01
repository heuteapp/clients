import { Box } from "@mui/material";
import { boardView } from "../utils/view.utils";

export const BoardCardItemView = boardView<"card-item">(({ ref, use, state, impl }) => {
    const isFrontFace = true;
    const cellStep = 32;

    return (
        <Box
            ref={ref}
            className={impl.className("card-item")}
            sx={impl.sx({
                width: (state.position.colSpan || 0) * (cellStep || 0),
                height: (state.position.rowSpan || 0) * (cellStep || 0),
            })}
        >
            {impl.content(() => {
                if(isFrontFace) {
                    return (
                        <>
                            <Box
                                data-title
                                className={"title"}
                                sx={{
                                    height: cellStep ? (1 * (cellStep || 0)): "auto"
                                }}
                            />
                            <Box
                                data-front-face
                                className={"face"}
                            >
                            </Box>
                        </>
                    )
                }
                else {
                    return (
                        <Box
                            data-back-face
                            className={"face"}
                        >
                        </Box>
                    )
                }
            })}

        </Box>
    )
});