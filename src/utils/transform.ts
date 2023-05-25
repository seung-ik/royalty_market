function generateInterfaceFromObject(obj: any, interfaceName: string): string {
	let interfaceCode = `interface ${interfaceName} {\n`;

	for (const key in obj) {
		if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
			const nestedInterfaceName = `${interfaceName}_${key}`;
			const nestedInterfaceCode = generateInterfaceFromObject(obj[key], nestedInterfaceName);
			interfaceCode += `  ${key}: ${nestedInterfaceName};\n\n`;
			interfaceCode += nestedInterfaceCode;
		} else {
			const propertyType = Array.isArray(obj[key]) ? `${getTypeFromArray(obj[key])}[]` : getType(obj[key]);
			interfaceCode += `  ${key}: ${propertyType};\n`;
		}
	}

	interfaceCode += `}`;

	return interfaceCode;
}

function getType(value: any): string {
	if (typeof value === "string") {
		return "string";
	} else if (typeof value === "number") {
		return "number";
	} else if (typeof value === "boolean") {
		return "boolean";
	} else {
		return "any";
	}
}

function getTypeFromArray(arr: any[]): string {
	if (arr.length === 0) {
		return "any";
	}

	const elementTypes = arr.map((item) => getType(item));
	const uniqueElementTypes = [...new Set(elementTypes)];

	if (uniqueElementTypes.length === 1) {
		return uniqueElementTypes[0];
	} else {
		return "any";
	}
}

// 예시 데이터
const exampleData = {
	year: 2023,
	startDate: "2022-08-30T07:00Z",
	endDate: "2023-06-24T06:59Z",
	displayName: "2022-23",
	type: {
		id: "3",
		type: 3,
		name: "Postseason",
		abbreviation: "post",
	},
};

// 인터페이스 생성 함수 호출
const interfaceName = "MyInterface";
const interfaceCode = generateInterfaceFromObject(exampleData, interfaceName);

console.log(interfaceCode);
