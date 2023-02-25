import * as xlsx from 'xlsx';

const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
  const workBook = xlsx.utils.book_new();
  const workSheetData = [workSheetColumnNames, ...data];
  const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
  xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
  xlsx.writeFile(workBook, filePath);
};

const exportUsersToExcel = (
  users,
  workSheetColumnNames,
  workSheetName,
  filePath,
) => {
  const data = users.map((user, index) => {
    return [
      index,
      user.name,
      user.email,
      user.sex,
      user.role,
      user.cccd,
      user.birth,
      user.ethnic,
      user.language,
      user.location,
    ];
  });
  exportExcel(data, workSheetColumnNames, workSheetName, filePath);
};

export default exportUsersToExcel;
