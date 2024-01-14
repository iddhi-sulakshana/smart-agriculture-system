import { Box, Button, FormControl, Stack, Textarea } from "@mui/joy";
import React from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

function MessageInput() {
    return (
        <Box sx={{ px: 2, pb: 3 }}>
            <FormControl>
                {/* Text Area to input messages to send */}
                <Textarea
                    placeholder="Type something here…"
                    aria-label="Message"
                    // ref={textAreaRef}
                    // onChange={(e) => {
                    //     setTextAreaValue(e.target.value);
                    // }}
                    // value={textAreaValue}
                    minRows={2}
                    maxRows={2}
                    endDecorator={
                        <Stack
                            alignItems="flex-end"
                            flexGrow={1}
                            sx={{
                                py: 1,
                                pr: 1,
                                borderTop: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Button
                                size="md"
                                color="primary"
                                endDecorator={<SendRoundedIcon />}
                                // onClick={handleClick}
                            >
                                Send
                            </Button>
                        </Stack>
                    }
                    // Handle enter key press to submit message
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            // handleClick();
                        }
                    }}
                />
            </FormControl>
        </Box>
    );
}

export default MessageInput;
