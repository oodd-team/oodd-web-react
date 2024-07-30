export interface MessageDto {
	id: number;
	text: string;
	sender: string;
	receiver: string;
	timestamp: Date;
}

export interface ExtendedMessageDto extends MessageDto {
	isFirst: boolean;
	isNewDate: boolean;
	printTime: boolean;
	formattedTime: string;
}
