This program intercepts scoreboard messages sent to CharacterWorks via UDP using the attached lss script.

Scoreboard header contains extra:
`\00\03\0d\0a`
This triggers a HTTP request to finish a motion to ensure that the cover is removed every time results are updated. Program is triggered by `0x03`.
This program will then strip the header and retransmit the packet.

The program also will react and retransmit anything with `1:` , `2:` or `T:`. These will get forwarded to a different UDP port which is another data source in CW to add text to the cover slide. Use the messages tool in AthleticLIVE Local on the scoreboard.

This is a special script! Do not use it without having this program strip the extra header data or you will have trouble in CW--it will skip every other message on the scoreboard standings.