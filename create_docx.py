#!/usr/bin/env python3
"""
Minimal .docx generator using only Python standard library.
"""
import zipfile
import os
import io
import re

# XML content for document.xml
DOCUMENT_XML = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" 
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
            xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing">
    <w:body>
{body}
        <w:sectPr>
            <w:pgSz w:w="12240" w:h="15840"/>
            <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
        </w:sectPr>
    </w:body>
</w:document>
'''

CONTENT_TYPES = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
    <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
    <Default Extension="xml" ContentType="application/xml"/>
    <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
    <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>
'''

RELATIONSHIPS = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>
'''

WORD_RELS = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>
'''

STYLES_XML = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
    <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
        <w:name w:val="Normal"/>
        <w:pPr>
            <w:spacing w:after="160" w:line="276" w:lineRule="auto"/>
        </w:pPr>
        <w:rPr>
            <w:rFonts w:ascii="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>
            <w:sz w:val="22"/>
            <w:szCs w:val="22"/>
        </w:rPr>
    </w:style>
    <w:style w:type="paragraph" w:styleId="Heading1">
        <w:name w:val="heading 1"/>
        <w:basedOn w:val="Normal"/>
        <w:pPr>
            <w:keepNext/>
            <w:pBdr>
                <w:bottom w:val="single" w:sz="6" w:space="1" w:color="auto"/>
            </w:pBdr>
            <w:spacing w:before="240" w:after="60"/>
        </w:pPr>
        <w:rPr>
            <w:rFonts w:ascii="Calibri Light" w:hAnsi="Calibri Light"/>
            <w:b/>
            <w:bCs/>
            <w:color w:val="2E74B5"/>
            <w:sz w:val="32"/>
            <w:szCs w:val="32"/>
        </w:rPr>
    </w:style>
    <w:style w:type="paragraph" w:styleId="Heading2">
        <w:name w:val="heading 2"/>
        <w:basedOn w:val="Normal"/>
        <w:pPr>
            <w:keepNext/>
            <w:spacing w:before="200" w:after="40"/>
        </w:pPr>
        <w:rPr>
            <w:rFonts w:ascii="Calibri Light" w:hAnsi="Calibri Light"/>
            <w:b/>
            <w:bCs/>
            <w:color w:val="2E74B5"/>
            <w:sz w:val="26"/>
            <w:szCs w:val="26"/>
        </w:rPr>
    </w:style>
</w:styles>
'''

def escape_xml(text):
    """Escape special XML characters"""
    return (text
            .replace('&', '&amp;')
            .replace('<', '&lt;')
            .replace('>', '&gt;')
            .replace('"', '&quot;')
            .replace("'", '&apos;'))

def create_paragraph(text, style="Normal", bold=False, italic=False):
    """Create a paragraph XML element"""
    rpr = ""
    if bold or italic:
        rpr = "<w:rPr>"
        if bold:
            rpr += "<w:b/><w:bCs/>"
        if italic:
            rpr += "<w:i/><w:iCs/>"
        rpr += "</w:rPr>"
    
    return f'''        <w:p>
            <w:pPr><w:pStyle w:val="{style}"/></w:pPr>
            <w:r>{rpr}<w:t>{escape_xml(text)}</w:t></w:r>
        </w:p>
'''

def markdown_to_word(md_text):
    """Convert simple markdown to Word XML"""
    lines = md_text.split('\n')
    paragraphs = []
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Headers
        if line.startswith('# '):
            paragraphs.append(create_paragraph(line[2:], 'Heading1'))
        elif line.startswith('## '):
            paragraphs.append(create_paragraph(line[3:], 'Heading2'))
        elif line.startswith('### '):
            paragraphs.append(create_paragraph(line[4:], 'Heading2'))
        elif line.startswith('**') and line.endswith('**'):
            # Bold text
            text = line.strip('*')
            paragraphs.append(create_paragraph(text, bold=True))
        else:
            # Regular paragraph - clean up stray formatting markers
            clean = line.replace('**', '')
            paragraphs.append(create_paragraph(clean))
    
    return '\n'.join(paragraphs)

def create_docx(content, output_path):
    """Create a .docx file from markdown content"""
    
    # Convert markdown to Word XML
    body_content = markdown_to_word(content)
    
    # Create the document XML
    document_xml = DOCUMENT_XML.format(body=body_content)
    
    # Create the ZIP file
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        zf.writestr('[Content_Types].xml', CONTENT_TYPES)
        zf.writestr('_rels/.rels', RELATIONSHIPS)
        zf.writestr('word/_rels/document.xml.rels', WORD_RELS)
        zf.writestr('word/document.xml', document_xml)
        zf.writestr('word/styles.xml', STYLES_XML)
    
    return output_path

def read_md_file(filepath):
    """Read markdown file and convert content"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

if __name__ == '__main__':
    input_file = '/home/agent/.openclaw/workspace/anxious-nervous-system-draft.md'
    output_file = '/home/agent/.openclaw/workspace/anxious-nervous-system-draft.docx'
    
    print(f"Reading: {input_file}")
    content = read_md_file(input_file)
    
    print(f"Creating: {output_file}")
    create_docx(content, output_file)
    
    print(f"✓ Word document created: {output_file}")
    
    # Show file size
    size = os.path.getsize(output_file)
    print(f"File size: {size} bytes")
