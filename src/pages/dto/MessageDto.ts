interface MessageDto {
	id: number;
	text: string;
	sender: string;
	receiver: string;
	timestamp: Date;
}

export default MessageDto;
