# 拷贝文件
# 替换图标
# 替换文本字符串

import os
import time
import shutil
import codecs
import logging

def copytree(src, dst, symlinks=False):
    names = os.listdir(src)
    if not os.path.isdir(dst):
        os.makedirs(dst)
    errors = []
    for name in names:
        srcname = os.path.join(src, name)
        dstname = os.path.join(dst, name)
        try:
            if symlinks and os.path.islink(srcname):
                linkto = os.readlink(srcname)
                os.symlink(linkto, dstname)
            elif os.path.isdir(srcname):
                copytree(srcname, dstname, symlinks)
            else:
                if os.path.isdir(dstname):
                    os.rmdir(dstname)
                elif os.path.isfile(dstname):
                    os.remove(dstname)
                shutil.copy2(srcname, dstname)
            # XXX What about devices, sockets etc.?
        except (IOError, os.error) as why:
            errors.append((srcname, dstname, str(why)))
        # catch the Error from the recursive copytree so that we can
        # continue with other files
        except OSError as err:
            errors.extend(err.args[0])
    # try:
    #     copystat(src, dst)
    # except WindowsError:
    #     # can't copy file access times on Windows
    #     pass
    # except OSError as why:
    #     errors.extend((src, dst, str(why)))
    # if errors:
    #     raise Error(errors)
if __name__ == '__main__':
    #copytree('dist', 'pp/bohe')
    site =[
        ("xxx","bbb","ccc"),
        ("xxx2","bbb","ccc")
    ]
    for (title,api,upload) in site:
        print(title)