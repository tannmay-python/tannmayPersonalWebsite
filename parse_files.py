import zipfile
import xml.etree.ElementTree as ET
import json
import os

def parse_docx():
    docx_path = '/Users/tannmaybaid/Downloads/Tannmay work.docx'
    with zipfile.ZipFile(docx_path) as docx:
        doc_xml = docx.read('word/document.xml')
        rels_xml = docx.read('word/_rels/document.xml.rels')
        
    rels_tree = ET.fromstring(rels_xml)
    rels = {}
    for rel in rels_tree:
        rels[rel.attrib.get('Id')] = rel.attrib.get('Target')
        
    doc_tree = ET.fromstring(doc_xml)
    
    results = []
    for p in doc_tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
        p_text = ""
        links = []
        # Word stores text in 'r' (run) elements which contain 't' (text) elements
        # Hyperlinks are sometimes separate elements.
        for node in p.iter():
            if node.tag == '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t' and node.text:
                p_text += node.text
            elif node.tag == '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}hyperlink':
                r_id = node.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
                if r_id and r_id in rels:
                    link_text = "".join(t.text for t in node.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text)
                    links.append({"text": link_text, "url": rels[r_id]})
                    # Note: link text might also be captured by the generic 't' iterator depending on how we iterate,
                    # but we'll just keep the link object.
        if p_text.strip():
            results.append({"text": p_text.strip(), "links": links})
            
    with open('docx_data.json', 'w') as f:
        json.dump(results, f, indent=2)

def parse_xlsx():
    xlsx_path = '/Users/tannmaybaid/Downloads/Tannmay Books.xlsx'
    with zipfile.ZipFile(xlsx_path) as xlsx:
        strings_xml = xlsx.read('xl/sharedStrings.xml')
        sheet_xml = xlsx.read('xl/worksheets/sheet1.xml')
        
    strings_tree = ET.fromstring(strings_xml)
    # the text might be in <t> elements directly or inside <r><t>
    shared_strings = []
    for si in strings_tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
        text = "".join(t.text for t in si.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') if t.text)
        shared_strings.append(text)
        
    sheet_tree = ET.fromstring(sheet_xml)
    rows = []
    for row in sheet_tree.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row'):
        row_data = []
        for c in row.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c'):
            v_node = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
            if v_node is not None:
                val = v_node.text
                if c.attrib.get('t') == 's':
                    val = shared_strings[int(val)]
                row_data.append(val)
        if row_data:
            rows.append(row_data)
            
    with open('xlsx_data.json', 'w') as f:
        json.dump(rows, f, indent=2)

try:
    parse_docx()
    print("Parsed docx successfully.")
except Exception as e:
    print("Error parsing docx:", e)

try:
    parse_xlsx()
    print("Parsed xlsx successfully.")
except Exception as e:
    print("Error parsing xlsx:", e)
