const recFileType = (fileType: string, content: any[]) => {
  if (fileType === 'txt') {
    const file = new Blob(content, { type: 'text/plain' });
    return file;
  }

  if (fileType === 'jpg' || fileType === 'jpeg') {
    const file = new Blob(content, { type: 'image/jpeg' });
    return file;
  }

  if (fileType === 'png') {
    const file = new Blob(content, { type: 'image/png' });
    return file;
  }

  if (fileType === 'pdf') {
    const file = new Blob(content, { type: 'application/pdf' });
    return file;
  }
  if (fileType === 'docx') {
    const file = new Blob(content, {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    return file;
  }
};

export default recFileType;
