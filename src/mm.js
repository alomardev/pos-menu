async function getVATDetails() {
  return {
    vatRate: 0.15,
    vatNumber: "123456789900003"
  };
}

async function getProducts() {
  await delay(1000);
  return [
    { itemId: 'f469d4e4-9c67-5136-a0f3-ad8675b86a63', categoryId: '23f8703e-44ad-593d-a146-4095cfaa78b1', categoryName: 'صنف رقم 1', name: 'Cazuwic', image: 'https://via.placeholder.com/500', barCode: '6018739729167', price: 58.64 },
    { itemId: '2b314f4a-add5-5e2a-8f44-6797981fcde6', categoryId: '3b6dabc3-e64e-5ed7-82c3-f8df5f764adb', categoryName: 'صنف رقم 2', name: 'Pipuguco', image: 'https://via.placeholder.com/500', barCode: '0619865180978', price: 60.13 },
    { itemId: '5db0e5b0-9873-56c9-833a-89f1f3282426', categoryId: '1b7036ec-9674-5325-8bd5-06c016c3f468', categoryName: 'صنف رقم 3', name: 'Sojkopcin', image: null, barCode: '311415583497', price: 59 },
    { itemId: 'b41bee92-aa93-5044-8f46-85022fa3c8e3', categoryId: '4705d02c-2e64-5c04-b5e6-bb4fd21b32a5', categoryName: 'صنف رقم 4', name: 'Zusarhu', image: 'https://via.placeholder.com/500', barCode: '3151415968244', price: 37.96 },
    { itemId: '056f3f91-d445-5de2-9a50-3bfee1c9f64b', categoryId: '36bef870-4afa-567c-9ed0-4c909e7b5f10', categoryName: 'صنف رقم 5', name: 'Lopfivug', image: 'https://via.placeholder.com/500', barCode: '4036344522267', price: 10.42 },
    { itemId: 'ee74a116-5e87-59ef-9960-87a20ba4c91e', categoryId: '6d47949d-80e4-5dea-a93a-9bc894630d9f', categoryName: 'صنف رقم 6', name: 'Belahvu', image: 'https://via.placeholder.com/500', barCode: '3344638891753', price: 26.51 },
    { itemId: '9a236ae4-50b7-5359-b8da-0d2af45e6f70', categoryId: 'b5d7f7f5-f447-506b-a39d-975366a25293', categoryName: 'صنف رقم 7', name: 'Isovja', image: 'https://via.placeholder.com/500', barCode: '7586149859984', price: 42.42 },
    { itemId: 'a4aa195d-748d-5ccf-b8d4-96143953db6c', categoryId: 'd217dd28-db49-579c-810a-77e1e2eac80a', categoryName: 'صنف رقم 8', name: 'Tadkusbuk', image: 'https://via.placeholder.com/500', barCode: '5979022156584', price: 14.40 },
    { itemId: '218ded9f-cf90-5d6d-84c2-c05467959b7f', categoryId: 'be2ac5cf-801c-5e37-b568-65c3dab29593', categoryName: 'صنف رقم 9', name: 'Kacgansu', image: 'https://via.placeholder.com/500', barCode: '3802968557952', price: 59.55 },
    { itemId: '9ee89ef1-3883-5c98-b4f4-693190e22f59', categoryId: '6d1745e5-e361-5554-a8e4-48fdbe9771bd', categoryName: 'صنف رقم 10', name: 'Sisguweb', image: 'https://via.placeholder.com/500', barCode: '3910768331071', price: 28.66 },
    { itemId: 'ed2755e8-737f-5be9-9fb6-15020b16390b', categoryId: 'e449ea51-fff7-585f-8f38-fad0abd0a139', categoryName: 'صنف رقم 11', name: 'Fegkotil', image: 'https://via.placeholder.com/500', barCode: '2573253208191', price: 29.53 },
    { itemId: 'eee3ac41-9712-5251-b3ec-484008d2415a', categoryId: '37f94176-2539-5a94-951c-aa0bb7bcf0e0', categoryName: 'صنف رقم 12', name: 'Episogfi', image: 'https://via.placeholder.com/500', barCode: '9831533980169', price: 29.47 },
    { itemId: '1635a2e9-5a03-5cf5-b611-2556f3338f5a', categoryId: '8f924ba8-114c-5895-8454-91743db44bd4', categoryName: 'صنف رقم 13', name: 'Ofitin', image: 'https://via.placeholder.com/500', barCode: '7700407214885', price: 33.74 },
    { itemId: '1f7c5625-a9cc-5677-93a0-8ccc1dc2cbfa', categoryId: '408e4838-17c6-553e-a423-3fbd136dc99d', categoryName: 'صنف رقم 14', name: 'Dufhenziv', image: null, barCode: '939526446341', price: 13 },
    { itemId: '4b86ad24-6364-5abc-a80d-2c214b8cc352', categoryId: '23f8703e-44ad-593d-a146-4095cfaa78b1', categoryName: 'صنف رقم 1', name: 'Fubinop', image: 'https://via.placeholder.com/500', barCode: '2300147966903', price: 54.8 },
    { itemId: '18595939-1125-56db-b33c-d55a2588dedc', categoryId: '3b6dabc3-e64e-5ed7-82c3-f8df5f764adb', categoryName: 'صنف رقم 2', name: 'Vaopino', image: 'https://via.placeholder.com/500', barCode: '6535011849207', price: 49.73 },
    { itemId: 'df09b017-796a-5c09-87dc-9f0985b6243e', categoryId: '1b7036ec-9674-5325-8bd5-06c016c3f468', categoryName: 'صنف رقم 3', name: 'Ditohoz', image: 'https://via.placeholder.com/500', barCode: '5678208670144', price: 28.98 },
    { itemId: 'bab3b5fa-fe7d-59e1-be6e-c3b2c5924c97', categoryId: '4705d02c-2e64-5c04-b5e6-bb4fd21b32a5', categoryName: 'صنف رقم 4', name: 'Hamojpum', image: 'https://via.placeholder.com/500', barCode: '2451580654606', price: 56.81 },
    { itemId: 'dc4d02b6-5b27-5857-9078-3b92374a710f', categoryId: '36bef870-4afa-567c-9ed0-4c909e7b5f10', categoryName: 'صنف رقم 5', name: 'Ivaciku', image: 'https://via.placeholder.com/500', barCode: '9909438565514', price: 34.79 },
    { itemId: '2a28e5e4-7906-5ac4-b8b4-5f587d250cc5', categoryId: '6d47949d-80e4-5dea-a93a-9bc894630d9f', categoryName: 'صنف رقم 6', name: 'Nairara', image: 'https://via.placeholder.com/500', barCode: '5554993601870', price: 52.42 },
    { itemId: '9a0129e7-5766-5cdd-9d2e-61d01e09a4e0', categoryId: '3b6dabc3-e64e-5ed7-82c3-f8df5f764adb', categoryName: 'صنف رقم 2', name: 'Bospuzbir', image: null, barCode: '252573968329', price: 37 },
    { itemId: '57484744-7fbc-5785-90bb-370453a1d4df', categoryId: 'd217dd28-db49-579c-810a-77e1e2eac80a', categoryName: 'صنف رقم 8', name: 'Jaakah', image: 'https://via.placeholder.com/500', barCode: '6526454597136', price: 32.34 },
    { itemId: 'c3ff84ef-283c-57bb-a4ab-a101c0179c6e', categoryId: 'be2ac5cf-801c-5e37-b568-65c3dab29593', categoryName: 'صنف رقم 9', name: 'Timanki', image: 'https://via.placeholder.com/500', barCode: '1772691848578', price: 31.49 },
    { itemId: '7ded02f9-3d42-5925-944c-59c8b865da6a', categoryId: '6d1745e5-e361-5554-a8e4-48fdbe9771bd', categoryName: 'صنف رقم 10', name: 'Hehnocsir', image: 'https://via.placeholder.com/500', barCode: '7819746798248', price: 32.91 },
    { itemId: '0fa6de0a-3d6b-5347-aa4a-a5b4db974f69', categoryId: '3b6dabc3-e64e-5ed7-82c3-f8df5f764adb', categoryName: 'صنف رقم 2', name: 'Takomre', image: 'https://via.placeholder.com/500', barCode: '9825325339045', price: 18.87 },
    { itemId: 'c74df1d3-0f2b-58bc-b283-5d417ae76bf7', categoryId: '37f94176-2539-5a94-951c-aa0bb7bcf0e0', categoryName: 'صنف رقم 12', name: 'Wanzanuk', image: 'https://via.placeholder.com/500', barCode: '8432738360148', price: 30.77 },
    { itemId: '1241e1bc-d08f-5c12-8514-c79bf2a9f57d', categoryId: '8f924ba8-114c-5895-8454-91743db44bd4', categoryName: 'صنف رقم 13', name: 'Socmimvat', image: 'https://via.placeholder.com/500', barCode: '1045490931354', price: 40.29 },
    { itemId: 'ccb9d3b4-1190-5848-a93f-817dbd4095ef', categoryId: '408e4838-17c6-553e-a423-3fbd136dc99d', categoryName: 'صنف رقم 14', name: 'Ruhgabuju', image: 'https://via.placeholder.com/500', barCode: '5442942149460', price: 27.20 },
    { itemId: '6013eb66-eabd-536a-9b46-68040ddadea8', categoryId: '23f8703e-44ad-593d-a146-4095cfaa78b1', categoryName: 'صنف رقم 1', name: 'Otecirud', image: null, barCode: '552589130481', price: 29 },
    { itemId: 'a5cea85e-df66-55f6-8aca-3652806f1bcb', categoryId: '3b6dabc3-e64e-5ed7-82c3-f8df5f764adb', categoryName: 'صنف رقم 2', name: 'Uzoizemuv', image: 'https://via.placeholder.com/500', barCode: '4005995103184', price: 10.31 },
    { itemId: '3917795c-4b8d-5c2b-accc-4961d090cae9', categoryId: '1b7036ec-9674-5325-8bd5-06c016c3f468', categoryName: 'صنف رقم 3', name: 'Ticokebor', image: 'https://via.placeholder.com/500', barCode: '4641204921462', price: 34.87 },
    { itemId: '95f27da8-7594-5c5c-b39d-3b18391c52aa', categoryId: '4705d02c-2e64-5c04-b5e6-bb4fd21b32a5', categoryName: 'صنف رقم 4', name: 'Ifofacak', image: 'https://via.placeholder.com/500', barCode: '1496957994330', price: 60.3 },
    { itemId: '1d6b5a64-2dab-576a-b2e9-3a5ef640638f', categoryId: '36bef870-4afa-567c-9ed0-4c909e7b5f10', categoryName: 'صنف رقم 5', name: 'Umopueba', image: 'https://via.placeholder.com/500', barCode: '3958328499572', price: 46.90 },
    { itemId: '3d6f2e62-9948-5c01-8b94-cf7caba923af', categoryId: '6d47949d-80e4-5dea-a93a-9bc894630d9f', categoryName: 'صنف رقم 6', name: 'Rubahuk', image: 'https://via.placeholder.com/500', barCode: '9328406027666', price: 46.14 },
    { itemId: '34845b0a-b5d3-56e7-8ba3-0c02cb853932', categoryId: '3b6dabc3-e64e-5ed7-82c3-f8df5f764adb', categoryName: 'صنف رقم 2', name: 'Hosefku', image: null, barCode: '814526741893', price: 26 },
    { itemId: '79ba3ed9-dd21-504a-9029-b0f485b50961', categoryId: 'd217dd28-db49-579c-810a-77e1e2eac80a', categoryName: 'صنف رقم 8', name: 'Neddoow', image: 'https://via.placeholder.com/500', barCode: '8645888118637', price: 49.17 },
    { itemId: 'd894f970-1aae-5c5b-acf6-bad3d7011501', categoryId: 'be2ac5cf-801c-5e37-b568-65c3dab29593', categoryName: 'صنف رقم 9', name: 'Kevbamu', image: 'https://via.placeholder.com/500', barCode: '8459534010253', price: 11.46 },
    { itemId: '0936de34-3ba0-5ca4-9fd7-a6b5687c7044', categoryId: '6d1745e5-e361-5554-a8e4-48fdbe9771bd', categoryName: 'صنف رقم 10', name: 'Wudliziw', image: null, barCode: '312613370651', price: 45 },
    { itemId: '39872abf-7d01-5141-aa9c-df2f6cb4f240', categoryId: 'e449ea51-fff7-585f-8f38-fad0abd0a139', categoryName: 'صنف رقم 11', name: 'Ipozuve', image: 'https://via.placeholder.com/500', barCode: '0120854824895', price: 42.2 },
    { itemId: '491ec43e-ba0f-50bb-a948-e999e638377e', categoryId: '37f94176-2539-5a94-951c-aa0bb7bcf0e0', categoryName: 'صنف رقم 12', name: 'Devluna', image: 'https://via.placeholder.com/500', barCode: '4721735727807', price: 27.48 },
    { itemId: 'd45688e7-f214-521b-b9a9-e769363b93cd', categoryId: '8f924ba8-114c-5895-8454-91743db44bd4', categoryName: 'صنف رقم 13', name: 'Bajicak', image: null, barCode: '631840876980', price: 10 },
    { itemId: 'd9b9fcc8-3457-5d86-9cf7-0b4cc4d2e45c', categoryId: '408e4838-17c6-553e-a423-3fbd136dc99d', categoryName: 'صنف رقم 14', name: 'Neduseeg', image: 'https://via.placeholder.com/500', barCode: '5602888647575', price: 15.27 },
  ];
}

async function submitOrder(order) {
  await delay(2000);
  return {
    invoiceNumber: '1087166',
    storeName: 'اسم المتجر',
    storeAddress: 'العنوان',
    cashierName: 'عبدالرحمن',
    time: new Date(),
    totalPrice: order.totalPrice,
    vatPrice: order.vatPrice,
    barCode: await getBarCodeImage(),
  };
}

/*** Test Helpers ***/

async function getBarCodeImage() {
  const response = await fetch('assets/sample-barcode.gif');
  const blob = await response.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function delay(millis) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), millis);
  });
}
