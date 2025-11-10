
import { useMemo } from 'react';
import type { Dealer } from '../types';

const rawCsvData = `
Furco Furniture Inc._Customer Contact List-2,,,,,,,,,,,,,,
Customer Contact List,,,,,,,,,,,,,,
,Dealer City,Dealer full name,Dealer Phone numbers,Dealer Email,Dealer owner name,Dealer address,Dealer FLOOR MODELS,Dealer FLOOR MODELS,Dealer FLOOR MODELS,Dealer FLOOR MODELS,Dealer FLOOR MODELS,Dealer FLOOR MODELS,Dealer FLOOR MODELS,Dealer FLOOR MODELS
ONTARIO,,,,,,,,,,,,,,
,Brampton,4EVER FURNITURE,Phone:905-216-6077,foureverfurniture@gmail.com,,"20 Wilkinson Rd
Unit # 7 & 8 Brampton ON L6T 5B2 Canada",NEW DREAMS ,,,,,,,
,Brampton,9 TREASURES FURNITURE,Phone:647-277-5656,,,142 Kennedy Rd S Unit 1 Brampton ON L6W 3G4 Canada,CONCORD,,,,,,,
,Mississauga,BAITUNA FURNITURE,Phone:647-290-9288,abdulkm78@yahoo.com,,1225 Dundas St E #20 Mississauga ON L4Y 2C5 Canada,,,,,,,,
,Brampton,BRAMPTON FURNITURE,Phone:647-812-8611,,,"270 Rutherford Rd S 
Unit 8-10 Brampton ON L6W 3K7 Canada",RESITAL,NEW DREAMS,,,,,,
,Scarborough,CANADA FURNITURE OUTLET,Phone:416-889-6399,,,2151 McCowan Rd Scarborough ON M1S 3Y6 Canada,BOSTON,CLARA,,,,,,
,North York,CLASSIC LIVING EXPRESSIONS FURNITURE,Phone:416-661-3235,,,4700 Dufferin St North York ON M3H 5S7 Canada,MILENYUM,NEW DREAMS,,,,,,
,Brampton,COMPLETE HOME FURNITURE,Phone:905-244-4663,Madiha@completehomefurnish.com,,547 Steeles Ave E Unit 3E Brampton ON L6W 4S2 Canada,,,,,,,,
,Scarborough,CONCEPT FURNITURE,Phone:416-755-0707,,,1119 Kennedy Rd unit # 1 Scarborough ON M1P 2K8 Canada,,,,,,,,
,Mississauga,COZHAVEN FURNITURE LTD,Mobile:647-806-9820,,,6435 Dixie Rd Mississauga ON L5T1X4 Canada,,,,,,,,
,Brampton,CROWN FURNITURE,Phone:905-863-0333,,,382 Queen St E Brampton ON L6V 1C3 Canada,CLARA,,,,,,,
,Brampton,DANNYS FURNITURE,Phone:905-272-2732,dannys@gmail.com,,1310 Steeles Ave E Brampton ON L6T 1A2 Canada,STELLA,ROMANCE,RESITAL,,,,,
,Brampton,DANNYS FURNITURE,Phone:905-272-2732,dannys@gmail.com,,"200B Clarence St, Brampton, ON L6W 1T4",GALERIA,PARMA,MAXIMO,,,,,
,Mississauga,DANNYS FURNITURE,Phone:905-272-2732,dannys@gmail.com,,"1310 Dundas St E Unit 2, Mississauga, ON L4Y 2C1",MAXIMO,,,,,,,
,Scarborough,DANNYS FURNITURE,Phone:905-272-2732,dannys@gmail.com,,"1309 Kennedy Rd, Scarborough, ON M1P 2L6",NEW DREAMS ,ASPENIA,MILENYUM,,,,,
,Scarborough,DESTINY FURNITURE,Phone:416-750-9991,destiniy@gmail.com,,1181 Kennedy Rd Unit 4 Scarborough ON M1P 2L2 Canada,NEW DREAMS ,,,,,,,
,Scarborough,DINE AND SUITE FURNITURE,Phone:416-750-9991,dinesuite@gmail.com,,1181 Kennedy Rd Unit 4 Scarborough ON M1P 2L2 Canada,MAXIMO DINING,,,,,,,
,Scarborough,ELEMENT FURNITURE,Phone:416-701-9333,,,1333 Kennedy Rd #7 Scarborough ON M1P 2L6 Canada,,,,,,,,
,Mississauga,EROS FURNITURE,Phone:905-618-1676,erosfurniture@gmail.com,,1945 Dundas St E Unit #2 Mississauga ON L4X 2T8 Canada,GALERIA,NEW DREAMS,BOSTON,ROMANCE DINING,ROMANCE,MAXIMO,ASPENIA,RESITAL
,Ottawa,FALL FAMILY FURNITURE OTTAWA,Phone:613-719-7778,,,1023 Merivale Rd Ottawa ON K1Z 6A6 Canada,NEW DREAMS ,,,,,,,
,Brampton,FURNITURE EMPIRE,Phone:905-497-1100,,,126 Devon Rd #2 Brampton ON L6T 5B3 Canada,,,,,,,,
,Mississauga,FURNITURE GIANT,Phone:905-238-1005,,,1515 Matheson Blvd E #104 Mississauga ON L4W 2P5 Canada,,,,,,,,
,Scarborough,FURNITURE PALACE,Phone:416-285-3331,thefurniturepalace@gmail.com,,1125 Kennedy Rd Unit# 5-6 Scarborough ON M1P 2K8 Canada,,,,,,,,
,Ottawa,FURNITURE POINT,Phone:613-286-1373,,,5 Caesar Ave UNIT -F Ottawa ON K2G 0A8 Canada,,,,,,,,
,Scarborough,FURNITURE SPACE,Phone:416-751-1919,,,1125 Kennedy Rd unit 7&8 Scarborough ON M1P 2K8 Canada,,,,,,,,
,Etobicoke,HOME XCENT,Phone:416-798-1219,,,"500 Rexdale Blvd, , Etobicoke ON M9W 6K5 Canada",RESITAL,,,,,,,
,Brampton,KITCHEN AND COUCH,Phone:416-674-1833,,,382 Queen Street East Brampton ON L6V 1C3 Canada,TUDOR,LIVA,RESITAL ,CONCORD,GALERIA,,,
,North York,NEW FURNITURE GALLERY,Phone:647-748-1424,,,"2450 Finch Ave W Unit 7, North York ON M9M 2E9 Canada",,,,,,,,
,Scarborough,PARAMOUNT FURNITURE,Phone:416-398-3339,info@furcofurniture.com,,"1329 Kennedy Rd Unit 101, Scarborough, ON M1P 2L6",MAXIMO,NEW DREAMS,ASPENIA,MAXIMO DINING,,,,
,Brampton,PARAMOUNT FURNITURE,Phone:416-398-3339,info@furcofurniture.com,,"74 Devon Rd, Brampton, ON L6T 5H3",MAXIMO,NEW DREAMS,ASPENIA,,,,,
,North York,PARAMOUNT FURNITURE,Phone:416-398-3339,info@furcofurniture.com,,"3711 Keele St, , ON North York ON M3J 1N1 Canada",NEVA,MAXIMO,STELLA,RESITAL,,,,
,Scarborough,PARAMOUNT FURNITURE - TORONTO FURNITURE MART,Phone:416-398-3339,info@furcofurniture.com,,"1119 Kennedy Rd, Scarborough, ON M1P 2K8",ZEN,ROMANCE,RESITAL,,,,,
,Mississauga,PERFECT MATTRESS FURNITURE,Phone:289-544-0713,,,1310 Dundas St E #6 Mississauga ON L4Y 2C1 Canada,MAXIMO,MILENYUM,RESITAL,,,,,
,North York,P&S FURNITURE,Phone:416-631-8008,psfurniture@gmail.com,,3675 Keele Street North York ON M3J 1M6 Camada,,,,,,,,
,Brampton,ROYAL FURNITURE,,info@furcofurniture.ca,,286 Rutherford Rd S #6 Brampton ON L6W 3K7 Canada,,,,,,,,
,Brampton,THE NORTH FURNITURE GALLERY,Phone:905-454-9994,thenorthfurniture144@gmail.com,,144 Kennedy Rd S Unit 5-6 Brampton ON L6W 3G4 CANADA,,,,,,,,
,Mississauga,UNIQUE FURNITURE,Phone:905-306-0004,Uniquefurniture1456@gmail.com,,1456-A Dundas St E Mississauga ON L4X 1L4,MAXIMO,MAXIMO DINING,MILENYUM,PARMA,GALERIA,ASPENIA,,
,Mississauga,UNIVERSAL FURNITURE,Phone:905-826-9555,Ufurniture65@gmail.com,,2835 Argentia Rd Unit: 2 Mississauga ON L5N 5V4 Canada,ZEN ,NEW DREAMS,MILENYUM,,,,,
,Mississauga,RS FURNITURE,,info@furcofurniture.ca,,,,,,,,,,
,Brampton,STEPHENS FURNITURE,,dannys@gmail.com,,,,,,,,,,
,Mississauga,TURKHOME,,,,,,,,,,,,
`;

function parseCsv(csvText: string): Dealer[] {
  const dealers: Dealer[] = [];
  const lines = csvText.split('\n').filter(line => line.trim() !== '');

  // Start processing after the header rows
  for (let i = 4; i < lines.length; i++) {
    const line = lines[i];
    // Simple CSV parsing, assuming commas are not in quoted fields
    const columns = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
    
    const city = columns[1];
    const fullName = columns[2];

    if (!city || !fullName) continue;

    const phone = columns[3].replace(/^(Phone:|Mobile:)/, '').trim();
    const email = columns[4];
    const ownerName = columns[5];
    const address = columns[6].replace(/\s+/g, ' ').trim();
    
    const floorModels = columns.slice(7)
      .map(model => model.trim())
      .filter(model => model !== '');

    dealers.push({ city, fullName, phone, email, ownerName, address, floorModels });
  }

  return dealers;
}

export const useDealers = () => {
  const data = useMemo(() => {
    const parsedDealers = parseCsv(rawCsvData);
    const uniqueCities = Array.from(new Set(parsedDealers.map(d => d.city))).sort();
    return { dealers: parsedDealers, cities: ['All', ...uniqueCities] };
  }, []);
  
  return data;
};
