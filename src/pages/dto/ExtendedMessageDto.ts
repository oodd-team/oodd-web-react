interface ExtendedMessageDto {
	id: number;
	text: string;
	sender: string;
	receiver: string;
	timestamp: Date;
	isFirst: boolean;
	isNewDate: boolean;
	printTime: boolean;
	formattedTime: string;
}

export default ExtendedMessageDto;
