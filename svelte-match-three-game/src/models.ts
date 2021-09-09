export type GridItemData = {
	name: string;
	backgroundImage: string;
	type: GridItemType
}
export enum GridItemType {EMPTY, RED, GREEN, BLUE, ORANGE,YELLOW, PURPLE}

export const EmptyGridItem: GridItemData = {
	name: 'Empty',
	backgroundImage: "",
	type: GridItemType.EMPTY
}
export const gridItemList: GridItemData[] = [
	{ name: "red", backgroundImage: "images/red.png", type: GridItemType.RED },
	{ name: "blue", backgroundImage: "images/blue.png", type: GridItemType.BLUE },
	{ name: "green", backgroundImage: "images/green.png", type: GridItemType.GREEN },
	{ name: "orange", backgroundImage: "images/orange.png", type: GridItemType.ORANGE },
	{ name: "yellow", backgroundImage: "images/yellow.png", type: GridItemType.YELLOW },
	{ name: "purple", backgroundImage: "images/purple.png", type: GridItemType.PURPLE },
];
